import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center h-100">
    <Spinner animation="border">
      <span className="visually-hidden">
        Загрузка...
      </span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
