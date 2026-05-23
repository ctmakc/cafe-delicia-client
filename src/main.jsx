import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/delicia.css';
import App from './generated/App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
