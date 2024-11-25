import React from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';

import './assets/index.css';
import './assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';

import init from './init';

const serverUrl = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

const run = async () => {
  const socket = io(serverUrl);
  const mountNode = document.getElementById('root');
  const root = createRoot(mountNode);
  const app = await init(socket);

  root.render(
    <React.StrictMode>
      {app}
    </React.StrictMode>,
  );
};

run();
