import { Button } from 'react-bootstrap';

import useButtonVariant from '../../hooks/useChannelButtonVariant';
import useSwitchChannelHandler from '../../hooks/useSwitchChannelHandler';

const ChannelButton = ({ id, name }) => {
  const buttonVariant = useButtonVariant(id);
  const handleSwitchChannel = useSwitchChannelHandler(id);

  return (
    <Button
      variant={buttonVariant}
      onClick={handleSwitchChannel}
      className="w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};

export default ChannelButton;
