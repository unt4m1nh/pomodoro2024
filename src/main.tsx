import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Disable strict mode for react-beautiful-dnd
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
