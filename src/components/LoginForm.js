import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../actions/auth";
import {message} from 'antd';

export default function LoginForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const error = useSelector(({auth}) => auth.login.error);
    error && message.error({
        content: error.message,
        style: {
            bottom: '20px',
            top: 'auto',
            position: 'fixed',
            right: 'calc(50% - 150px)'
        }});

    const onSubmit = data => {
        dispatch(loginUser(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form small-form login-form">
            <div className="header">Login to VChat</div>
            <div className="subheader">Login and chat with other people!</div>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"/>
                </div>
                {false && <div className="alert alert-danger small">Some error</div>}
                <button
                    type="submit"
                    className="btn btn-outline-primary margin-v10">Login</button>
            </div>
        </form>
)
}