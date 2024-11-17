import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardFooter } from 'react-bootstrap';

import ROUTE_PATHS from '../../../routes/routePaths';

const LoginCardFooter = () => {
  const { t } = useTranslation();

  return (
    <CardFooter className="p-4">
      <div className="text-center">
        <span className="me-1">
          {`${t('noAccount')}?`}
        </span>
        <Link to={ROUTE_PATHS.getSignup()}>
          {t('registration')}
        </Link>
      </div>
    </CardFooter>
  );
};

export default LoginCardFooter;
