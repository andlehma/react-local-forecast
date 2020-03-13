import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import config from './config';
import './main.css';

ReactDOM.render(
  <App apiKey={config.API_KEY}/>,
  document.getElementById('root')
);
