import React from 'react';
import './Loader.scss';
import loaderImg from '../../assets/images/react.svg';

export default function Loader() {
    return (
        <img src={loaderImg} className="react-logo"/>
    )
}