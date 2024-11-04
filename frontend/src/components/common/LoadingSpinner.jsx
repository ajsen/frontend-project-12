import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border">
        <span className="visually-hidden">
          {`${t('loading')}...`}
        </span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
