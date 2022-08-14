import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss' // 引入全局样式
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
