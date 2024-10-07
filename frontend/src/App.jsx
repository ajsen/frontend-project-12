import { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ROUTE_PATHS from './routePaths';
import store from './slices';
import PrivateRoute from './PrivateRoute';
import Layout from './components/Layout';
import Modal from './components/Modal';
import ModalProvider from './providers/ModalProvider';
import SocketProvider from './providers/SocketProvider';
import ConversationsProvider from './providers/ConversationsProvider';

const MainPage = lazy(() => import('./pages/Main'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const LoginPage = lazy(() => import('./pages/Login'));

const App = () => (
  <div id="chat" className="h-100">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATHS.mainPage} element={<Layout />}>
            <Route
              index
              path={ROUTE_PATHS.mainPage}
              element={(
                <PrivateRoute>
                  <ModalProvider>
                    <SocketProvider>
                      <ConversationsProvider>
                        <Modal />
                        <MainPage />
                      </ConversationsProvider>
                    </SocketProvider>
                  </ModalProvider>
                </PrivateRoute>
              )}
            />
            <Route path={ROUTE_PATHS.loginPage} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.notFoundPage} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
