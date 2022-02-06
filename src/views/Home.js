import React, {useEffect, useState} from 'react';
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import ViewTitle from "../components/shared/ViewTitle";
import {fetchChats} from "../actions/chats";
import {useDispatch, useSelector} from "react-redux";
import {Tooltip} from "antd";
import {UsergroupAddOutlined} from '@ant-design/icons';
import CrateChatModal from "../components/modals/CreateChatModal";

export default function Home() {
    const dispatch = useDispatch();
    const joinedChats = useSelector(({chats}) => chats.joined);
    const availableChats = useSelector(({chats}) => chats.available);
    const [createChatModal, setCreateChatModal] = useState(false);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);
    return (
        <div className="row no-gutters fh mr-0">
            <div className="col-3 fh">
                <JoinedChats chats={joinedChats}/>
            </div>
            <div className="col-9 fh">
                <ViewTitle title={"Available chats"}>
                    <Tooltip title="Create chat" color="blue">
                        <UsergroupAddOutlined
                            onClick={() => setCreateChatModal(true)}
                            style={{fontSize: 18, color: '#40a9ff'}}/>
                    </Tooltip>
                    <CrateChatModal visible={createChatModal} setVisibility={setCreateChatModal} />
                </ViewTitle>
                <div className="container-fluid">
                    <AvailableChats chats={availableChats}/>
                </div>
            </div>
        </div>
    )
}