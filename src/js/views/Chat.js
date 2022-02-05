import React from 'react';
import UserList from "../components/chat/UserList";
import MessagesContainer from "../components/chat/MessagesContainer";
import ViewTitle from "../components/shared/ViewTitle";
import {useParams} from "react-router-dom";

export default function Chat() {
    const params = useParams();

    return (
        <div className="row no-gutters fh mr-0 ">
            <div className="col-3 fh">
                <UserList/>
            </div>
            <div className="col-9 fh">
                <ViewTitle title={`Chat ${params.chatId}`}/>
                <MessagesContainer/>
            </div>
        </div>
    )
}