import i18n from 'i18next';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';

import resources from './locales';
import store from './slices';
import LoadingSpinner from './components/common/LoadingSpinner';

const App = lazy(() => import('./components/App'));

const defaultLng = 'ru';

const isDevelopment = process.env.NODE_ENV === 'development';

const defaultValidationMessages = {
  mixed: {
    required: 'feedbackMessages.requiredField',
    notOneOf: 'feedbackMessages.mustBeUnique',
  },
};

const init = async () => {
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

    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18nInstance}>
          <Suspense fallback={<LoadingSpinner />}>
            <App />
          </Suspense>
        </I18nextProvider>
      </Provider >
    );
  } catch (error) {
    console.error(`Failed to initialize ${error}`);
  }
};

export default init;
