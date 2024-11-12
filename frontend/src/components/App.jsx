import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ROUTE_PATHS from '../routes/routePaths';
import PrivateRoute from '../routes/PrivateRoute';
import Layout from './Layout';
import Modal from './Modal';
import ModalProvider from '../contexts/ModalProvider';
import ProfanityFilterProvider from '../contexts/ProfanityFilterProvider';

const MainPage = lazy(() => import('./MainPage'));
const LoginPage = lazy(() => import('./auth/LoginPage'));
const SignupPage = lazy(() => import('./auth/SignupPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const App = () => (
  <BrowserRouter>
    <div id="chat" className="h-100">
      <Routes>
        <Route path={ROUTE_PATHS.mainPage} element={<Layout />}>
          <Route
            index
            path={ROUTE_PATHS.mainPage}
            element={(
              <ProfanityFilterProvider>
                <ModalProvider>
                  <PrivateRoute>
                    <Modal />
                    <MainPage />
                  </PrivateRoute>
                </ModalProvider>
              </ProfanityFilterProvider>
            )}
          />
          <Route path={ROUTE_PATHS.loginPage} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.signupPage} element={<SignupPage />} />
          <Route path={ROUTE_PATHS.notFoundPage} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
