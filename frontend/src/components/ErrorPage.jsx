import { Container, Image } from 'react-bootstrap';

import errorImg from '../assets/error.svg';

const ErrorPage = ({ errorMessage }) => (
  <Container fluid className="d-flex flex-column h-100 align-items-center justify-content-center position-relative">
    <Image
      src={errorImg}
      alt="Initialization error"
      className="h-50"
      fluid
    />
    <h1 className="h4 text-muted">
      Failed to initialize
    </h1>
    <p className="text-muted">
      {errorMessage}
    </p>
    <div className="small text-muted position-absolute bottom-0 end-0 p-2">
      Image by
      <a className="ms-1" href="https://freepik.com">
        Freepik
      </a>
    </div>
  </Container>
);

export default ErrorPage;
