import { useTranslation } from 'react-i18next';

import AuthCard from './components/AuthCard';
import AuthContainer from './components/AuthContainer';
import SignupForm from './components/SignupForm';
import logo from '../../assets/avatar_1.jpg';

const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <AuthContainer>
      <AuthCard form={<SignupForm />} src={logo} alt={t('registration')} roundedCircle />
    </AuthContainer>
  );
};

export default SignupPage;
