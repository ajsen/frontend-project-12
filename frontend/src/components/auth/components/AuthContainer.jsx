import { Col, Container, Row } from 'react-bootstrap';

const AuthContainer = ({ children }) => (
  <Container className="h-100" fluid>
    <Row className="justify-content-center align-items-center h-100">
      <Col xs={12} md={8} xxl={6}>
        {children}
      </Col>
    </Row>
  </Container>
);

export default AuthContainer;
