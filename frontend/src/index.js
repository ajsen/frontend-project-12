import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/index.css';
import './assets/application.scss';

import i18n from './utils/i18n';
import App from './App';

const mountNode = document.getElementById('root');
const root = createRoot(mountNode);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
