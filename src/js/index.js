import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.scss'
import 'antd/dist/antd.css';

ReactDom.render(<App/>, document.getElementById('chatApp'));