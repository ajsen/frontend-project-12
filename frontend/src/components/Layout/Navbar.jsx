import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ROUTE_PATHS from '../../routePaths';
import LogoutButton from './NavbarLogoutButton';

const NavigationBar = () => (
  <Navbar
    className="shadow-sm"
    bg="white"
    variant="light"
    expand="lg"
  >
    <Container>
      <Navbar.Brand as={Link} to={ROUTE_PATHS.mainPage}>
        Hexlet Chat
      </Navbar.Brand>
      <LogoutButton />
    </Container>
  </Navbar>
);

export default NavigationBar;