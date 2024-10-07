import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ROUTE_PATHS from '../routePaths';
import loginLogo from '../assets/avatar.jpg';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xll={4}>
          <Card className="shadow-sm">
            <Row as={Card.Body} className="p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={loginLogo} alt="Войти" roundedCircle />
              </Col>
              <LoginForm />
            </Row>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-1">
                  {t('loginPage.footer.doNotHaveAnAccount')}
                </span>
                <Link to={ROUTE_PATHS.signupPage}>
                  {t('loginPage.footer.registration')}
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
