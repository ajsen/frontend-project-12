import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routePaths from '../routes/routePaths';
import PrivateRoute from '../routes/PrivateRoute';
import Layout from './Layout';
import Modal from './Modal';

const MainPage = lazy(() => import('./MainPage'));
const LoginPage = lazy(() => import('./auth/LoginPage'));
const SignupPage = lazy(() => import('./auth/SignupPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const App = () => (
  <BrowserRouter>
    <div id="chat" className="h-100">
      <Routes>
        <Route path={routePaths.getMain()} element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path={routePaths.getMain()} element={<MainPage />} />
          </Route>
          <Route path={routePaths.getLogin()} element={<LoginPage />} />
          <Route path={routePaths.getSignup()} element={<SignupPage />} />
          <Route path={routePaths.getNotFound()} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
    <Modal />
    <ToastContainer />
  </BrowserRouter>
);

export default App;
