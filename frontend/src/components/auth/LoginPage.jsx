import { t } from 'i18next';

import AuthCard from './components/AuthCard';
import LoginCardFooter from './components/LoginCardFooter';
import AuthContainer from './components/AuthContainer';
import LoginForm from './components/LoginForm';
import image from '../../assets/avatar.jpg';

const LoginPage = () => (
  <AuthContainer>
    <AuthCard form={<LoginForm />} footer={<LoginCardFooter />} src={image} alt={t('login')} roundedCircle />
  </AuthContainer>
);

export default LoginPage;
