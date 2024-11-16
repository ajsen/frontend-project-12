import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ROUTE_PATHS from '../routes/routePaths';
import PrivateRoute from '../routes/PrivateRoute';
import Layout from './Layout';

const MainPage = lazy(() => import('./MainPage'));
const LoginPage = lazy(() => import('./auth/LoginPage'));
const SignupPage = lazy(() => import('./auth/SignupPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const App = () => (
  <BrowserRouter>
    <div id="chat" className="h-100">
      <Routes>
        <Route path={ROUTE_PATHS.getMain()} element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path={ROUTE_PATHS.getMain()} element={<MainPage />} />
          </Route>
          <Route path={ROUTE_PATHS.getLogin()} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.getSignup()} element={<SignupPage />} />
          <Route path={ROUTE_PATHS.getNotFound()} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
