import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/index.css';
import './assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';

import init from './init';

const run = async () => {
  const mountNode = document.getElementById('root');
  const root = createRoot(mountNode);
  const app = await init();

  root.render(
    <React.StrictMode>
      {app}
    </React.StrictMode>,
  );
};

run();
