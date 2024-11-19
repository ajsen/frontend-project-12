import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardFooter } from 'react-bootstrap';

import routePaths from '../../../routes/routePaths';

const LoginCardFooter = () => {
  const { t } = useTranslation();

  return (
    <CardFooter className="p-4">
      <div className="text-center">
        <span className="me-1">
          {`${t('noAccount')}?`}
        </span>
        <Link to={routePaths.getSignup()}>
          {t('registration')}
        </Link>
      </div>
    </CardFooter>
  );
};

export default LoginCardFooter;
