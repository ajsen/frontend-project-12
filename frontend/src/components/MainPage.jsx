import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useSocket from '../hooks/useSocket';
import Channels from './Channels';
import Messages from './Messages';

const MainPage = () => {
  const { t } = useTranslation();
  const { startSocket, closeSocket } = useSocket();

  useEffect(() => {
    try {
      startSocket();
    } catch (error) {
      toast.error(t(error.message));
    }
    return () => {
      closeSocket();
    };
  }, [startSocket, closeSocket, t]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
