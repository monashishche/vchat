import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../actions/auth";
import {message} from 'antd';

export default function RegisterForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const error = useSelector(({auth}) => auth.register.error);
    console.log(error);
    error && message.error({
        content: error,
        style: {
            bottom: '20px',
            top: 'auto',
            position: 'fixed',
            right: 'calc(50% - 150px)'
        }});

    const onSubmit = data => {
        dispatch(registerUser(data));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form small-form register-form">
            <div className="header">Create an account</div>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        {...register("username")}
                        type="text"
                        name="username"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        {...register("avatar")}
                        type="text"
                        name="avatar"
                        className="form-control"
                        id="avatar"
                        aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        {...register("password")}
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"/>
                </div>
                {false && <div className="alert alert-danger small">Some Error</div>}
                <button type="submit" className="btn btn-outline-primary">Register</button>
            </div>
        </form>
    )
}