import { Container, Row } from 'react-bootstrap';

import Channels from './Channels';
import Messages from './Messages';

const MainPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
    </Row>
  </Container>
);

export default MainPage;
