import React from 'react';
import {Link} from 'react-router-dom';

export default function ViewTitle(props) {
    return (
        <div className="chat-name-container">
            <span className="name">{props.title}</span>
        </div>
    )
}