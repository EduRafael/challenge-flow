import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';

const element = (
    <React.StrictMode>
        <App />    
    </React.StrictMode>
)

const container = document.getElementById('root');

ReactDOM.render(element, container)