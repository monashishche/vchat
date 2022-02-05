import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';

const { Search } = Input;

export default function JoinedChats({chats = []}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const onSearch = value => {
        setSearch(value);
    };
    return (
        <div className="list-container">
            <div className="chat-search-box">
                <div className="input-group">
                    <Search placeholder="find chat" onSearch={onSearch} onChange={(e) => onSearch(e.target.value)} style={{ width: '100%' }} />
                </div>
            </div>
            <ul className="items">
                {chats.filter(chat => !search || (search.length > 0 && chat.name.toLowerCase().includes(search.toLowerCase())))
                    .map(chat => {
                    return (
                        <li
                            key={chat.id}
                            onClick={() => {
                                navigate(`/chat/${chat.id}`)
                            }}
                            className="item">
                            <div className="item-status">
                                <img
                                    src={chat.image}
                                    alt="Retail Admin"/>
                                <span className="status online"></span>
                            </div>
                            <p className="name-time">
                                <span className="name mr-2">{chat.name}</span>
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>

    )
}