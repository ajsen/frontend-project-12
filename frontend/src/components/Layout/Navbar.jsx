import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar } from 'react-bootstrap';

import routePaths from '../../routes/routePaths';
import LogoutButton from './NavbarLogoutButton';

const NavigationBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar
      className="shadow-sm"
      bg="white"
      variant="light"
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to={routePaths.getMain()}>
          {t('hexletChat')}
        </Navbar.Brand>
        <LogoutButton />
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
