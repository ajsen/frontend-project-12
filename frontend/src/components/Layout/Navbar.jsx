import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar as BsNavbar } from 'react-bootstrap';

import routePaths from '../../routes/routePaths';
import NavbarLogoutButton from './NavbarLogoutButton';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <BsNavbar
      className="shadow-sm"
      bg="white"
      variant="light"
      expand="lg"
    >
      <Container>
        <BsNavbar.Brand as={Link} to={routePaths.getMain()}>
          {t('hexletChat')}
        </BsNavbar.Brand>
        <NavbarLogoutButton />
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
