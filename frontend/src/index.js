import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/index.css';
import './assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';

import init from './init';

const mountNode = document.getElementById('root');
const root = createRoot(mountNode);

root.render(
  <React.StrictMode>
    {await init()}
  </React.StrictMode>
);
