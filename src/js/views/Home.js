import React, {useEffect} from 'react';
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import ViewTitle from "../components/shared/ViewTitle";
import {fetchChats} from "../actions/chats";
import {useDispatch, useSelector} from "react-redux";

export default function Home() {
    const dispatch = useDispatch();
    const joinedChats = useSelector(({chats}) => chats.joined);
    const availableChats = useSelector(({chats}) => chats.available);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);
    return (
        <div className="row no-gutters fh mr-0">
            <div className="col-3 fh">
                <JoinedChats chats={joinedChats}/>
            </div>
            <div className="col-9 fh">
                <ViewTitle title={"Choose your channel"}/>
                <div className="container-fluid">
                    <AvailableChats chats={availableChats}/>
                </div>
            </div>
        </div>
    )
}