import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/auth";
import {Tooltip} from 'antd';
import {SettingTwoTone, HomeTwoTone, PoweroffOutlined, ExclamationCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';

export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    const isOnline = useSelector(({app}) => app.isOnline);

    return (
            <div className="chat-navbar">
                <nav className="chat-navbar-inner">
                    <div className="chat-navbar-inner-left">
                        <Link to={"/"} style={{fontSize: 18}}>
                            <Tooltip title="Home" color="blue"><HomeTwoTone /></Tooltip>
                        </Link>
                        <Link to={"/settings"} style={{fontSize: 18}}>
                            <Tooltip title="Settings" color="blue"><SettingTwoTone /></Tooltip>
                        </Link>
                    </div>
                    <div className="chat-navbar-inner-right">
                        {user ?
                            <>
                                {isOnline ?
                                    <Tooltip title="Online" color="red">
                                        <CheckCircleOutlined style={{color: 'green'}}/>
                                    </Tooltip>
                                    :
                                    <Tooltip title="You are offline" color="red">
                                        <ExclamationCircleOutlined style={{color: 'red'}}/>
                                    </Tooltip>
                                }
                                <img className="avatar mr-2" src={user.avatar} alt=""/>
                                <span className="logged-in-user ml-5">Hi {user.username} </span>
                                <Tooltip title="Logout" color="red">
                                <PoweroffOutlined onClick={() => dispatch(logout())} style={{color: 'red'}}/>
                                </Tooltip>
                            </>
                        :
                            <Link to={"/"} className="btn btn-sm btn-outline-success ml-2 margin-h10">Login</Link>
                        }
                    </div>
                </nav>
            </div>
    )
}