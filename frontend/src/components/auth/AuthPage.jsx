import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Card,
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';

import routePaths from '../../routes/routePaths';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import loginImg from '../../assets/avatar.jpg';
import signupImg from '../../assets/avatar_1.jpg';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Card.Footer className="p-4">
      <div className="text-center">
        <span className="me-1">
          {`${t('noAccount')}?`}
        </span>
        <Link to={routePaths.getSignup()}>
          {t('registration')}
        </Link>
      </div>
    </Card.Footer>
  );
};

const forms = {
  login: {
    form: <LoginForm />,
    src: loginImg,
    alt: 'login',
    footer: <Footer />,
  },
  signup: {
    form: <SignupForm />,
    src: signupImg,
    alt: 'registration',
    footer: null,
  },
};

const AuthPage = ({ authType }) => {
  const { t } = useTranslation();
  const {
    form,
    src,
    alt,
    footer,
  } = useMemo(() => forms[authType], [authType]);

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Row as={Card.Body} className="p-5">
              <Col xs={12} md={6} className="d-flex mb-3 mb-md-0 align-items-center justify-content-center">
                <Image
                  src={src}
                  alt={t(alt)}
                  roundedCircle
                />
              </Col>
              {form}
            </Row>
            {footer}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
