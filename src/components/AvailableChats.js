import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {joinChat} from '../actions/chats';

export default function AvailableChats({chats = []}) {
    const user = useSelector(({auth}) => auth.user);
    const dispatch = useDispatch();

    const askForConfirmation = chat => {
        const isConfirming = window.confirm(`Do you want to join the chat: ${chat.name} ?`);

        if (isConfirming) {
            dispatch(joinChat(chat, user.uid));
        }
    }
    return (

        <div className="row mt-3">
            {(!chats || chats.length === 0) &&
            <div className="container-fluid">
                <div className="alert alert-warning">There is no available chats to join.</div>
            </div>}
            {chats.map(chat => {
                return (
                    <div className="col-lg-3 col-md-6 mb-3" key={chat.id}>
                        <div className="card chat-card">
                            <div className="card-body">
                                <div style={{backgroundImage: `url(${chat.image})`}} className="chat-img"></div>
                                <h5 className="card-title">{chat.name}</h5>
                                <p className="card-text">{chat.description}</p>
                                <button
                                    onClick={() => askForConfirmation(chat)}
                                    className="btn btn-outline-primary">Join
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}