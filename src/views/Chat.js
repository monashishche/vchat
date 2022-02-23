import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import ChatUserList from '../components/ChatUsersList';
import ChatMessagesList from '../components/ChatMessagesList';
import ViewTitle from '../components/shared/ViewTitle';
import LoadingView from '../components/shared/Loading';
import Messenger from '../components/Messenger';
import {Dropdown, Menu} from 'antd';
import {DeleteOutlined, HistoryOutlined, LogoutOutlined, ToolTwoTone} from '@ant-design/icons';

import {
    clearChatMessages,
    registerMessageSubscription,
    sendChatMessage,
    subscribeToChat,
    subscribeToMessages,
    subscribeToProfile
} from '../actions/chats';

export default function Chat() {
    const {id} = useParams();
    const peopleWatchers = useRef({});
    const messageList = useRef();
    const dispatch = useDispatch();
    const activeChat = useSelector(({chats}) => chats.activeChats[id])
    const messages = useSelector(({chats}) => chats.messages[id])
    const messagesSub = useSelector(({chats}) => chats.messagesSubs[id])
    const joinedUsers = activeChat?.joinedUsers;
    const user = useSelector(({auth}) => auth.user);
    const [userChatAdmin, setUserChatAdmin] = useState(false);

    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));

        if (!messagesSub) {
            const unsubFromMessages = dispatch(subscribeToMessages(id));
            dispatch(registerMessageSubscription(id, unsubFromMessages));
        }

        return () => {
            unsubFromChat();
            unsubFromJoinedUsers();
        }
    }, []);

    useEffect(() => {
        joinedUsers && subscribeToJoinedUsers(joinedUsers);
    }, [joinedUsers]);

    const isUserChatAdmin = async () => {
        const userSnapshot = await activeChat?.admin.get();
        return userSnapshot?.data();
    };
    useEffect(() => {
        isUserChatAdmin().then(res => setUserChatAdmin(res));
    }, [activeChat]);

    useEffect(() => {
        messageList.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, [messageList.current]);

    const subscribeToJoinedUsers = useCallback(jUsers => {
        jUsers.forEach(user => {
            if (!peopleWatchers.current[user.uid]) {
                peopleWatchers.current[user.uid] = dispatch(subscribeToProfile(user.uid, id))
            }
        })
    }, [dispatch, id]);

    const sendMessage = useCallback(message => {
        dispatch(sendChatMessage(message, id))
            .then(_ => messageList.current.scrollIntoView({ behavior: 'smooth', block: 'end' }))
    }, [id]);

    const unsubFromJoinedUsers = useCallback(() => {
        Object.keys(peopleWatchers.current)
            .forEach(id => peopleWatchers.current[id]())
    }, [peopleWatchers.current]);

    if (!activeChat?.id) {
        return <LoadingView message="Loading Chat..."/>
    }

    const askForConfirmation = chat => {
        const isConfirming = window.confirm(`Do you want to clear chat history?`);

        if (isConfirming) {
            dispatch(clearChatMessages(chat));
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<LogoutOutlined/>} disabled>
                Leave chat
            </Menu.Item>
            <Menu.Item key="2" icon={<HistoryOutlined/>} onClick={() => askForConfirmation(id)}>
                Clear messages
            </Menu.Item>
            <Menu.Item key="3" icon={<DeleteOutlined/>} danger disabled>
                Delete chat
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="row no-gutters fh mr-0">
            <div className="col-3 fh">
                <ChatUserList users={activeChat?.joinedUsers}/>
            </div>
            <div className="col-9 fh">
                <ViewTitle title={`${activeChat?.name}`}>
                    {userChatAdmin && userChatAdmin.uid === user.uid ?
                        <Dropdown overlay={menu}><ToolTwoTone style={{fontSize: 18, cursor: 'pointer'}}/></Dropdown>
                        : null
                    }
                </ViewTitle>
                <ChatMessagesList
                    innerRef={messageList}
                    messages={messages}/>
                <Messenger onSubmit={sendMessage}/>
            </div>
        </div>
    )
}