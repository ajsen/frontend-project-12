import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routePaths from '../routes/routePaths';
import image from '../assets/404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image
        src={image}
        alt={t('pageNotFound')}
        className="h-25"
        fluid
      />
      <h1 className="h4 text-muted">
        {t('pageNotFound')}
      </h1>
      <p className="text-muted">
        {t('butYouCanFollow')}
        <Link to={routePaths.getMain()} className="ms-1">
          {t('toMainPage')}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
