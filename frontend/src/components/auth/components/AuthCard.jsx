import { Card, Col, Image, Row } from 'react-bootstrap';

const AuthCard = ({ form, footer = null, ...restProps }) => (
  <Card className="shadow-sm">
    <Row as={Card.Body} className="p-5">
      <Col xs={12} md={6} className="d-flex mb-3 mb-md-0 align-items-center justify-content-center">
        <Image {...restProps} />
      </Col>
      {form}
    </Row>
    {footer}
  </Card>
);

export default AuthCard;
