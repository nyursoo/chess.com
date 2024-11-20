import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Main from './pages/Main.jsx'
import Arr from './pages/arr.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Main/>
    <Arr/>
  </React.StrictMode>
);
