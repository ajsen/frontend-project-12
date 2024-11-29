import { Button } from 'react-bootstrap';

import useSwitchChannelHandler from '../../hooks/useSwitchChannelHandler';
import { activeVariant, defaultVariant } from './constants';

const ChannelButton = ({ id, name, isActive }) => {
  const handleSwitchChannel = useSwitchChannelHandler(id);

  return (
    <Button
      variant={isActive ? activeVariant : defaultVariant}
      onClick={handleSwitchChannel}
      className="w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};

export default ChannelButton;
