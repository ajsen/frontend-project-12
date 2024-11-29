import i18n from 'i18next';
import {
  Provider as RollbarProvider,
  ErrorBoundary as RollbarErrorBoundary,
} from '@rollbar/react';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';
import { io } from 'socket.io-client';

import ProfanityFilterProvider from './providers/ProfanityFilterProvider';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorPage from './components/ErrorPage';
import resources from './locales';
import store from './slices';
import createSocketListeners from './utils/createSocketListeners';

const App = lazy(() => import('./components/App'));

const defaultLng = 'ru';

const isDevelopment = process.env.NODE_ENV === 'development';

const serverUrl = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

const defaultValidationMessages = {
  mixed: {
    required: 'feedbackMessages.requiredField',
    notOneOf: 'feedbackMessages.mustBeUnique',
  },
};

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const init = async () => {
  const socket = io(serverUrl);
  const i18nInstance = i18n.createInstance();
  try {
    await i18nInstance
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: defaultLng,
        interpolation: {
          escapeValue: false,
        },
        debug: isDevelopment,
      });

    setLocale(defaultValidationMessages);

    const socketListeners = createSocketListeners(socket);

    socket.on('connect', () => {
      socketListeners.start();
    });

    return (
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <RollbarErrorBoundary>
            <I18nextProvider i18n={i18nInstance}>
              <Suspense fallback={<LoadingSpinner />}>
                <ProfanityFilterProvider>
                  <App />
                </ProfanityFilterProvider>
              </Suspense>
            </I18nextProvider>
          </RollbarErrorBoundary>
        </RollbarProvider>
      </Provider>
    );
  } catch (error) {
    console.error('Initialization failed:', error);
    return <ErrorPage errorMessage={error.message} />;
  }
};

export default init;
