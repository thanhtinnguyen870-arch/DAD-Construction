import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Remove initial loader once React has mounted
const loader = document.getElementById('initial-loader');
if (loader) {
  loader.classList.add('fade-out');
  setTimeout(() => loader.remove(), 350);
}
