import {
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useSwitchChannelHandler from '../../hooks/useSwitchChannelHandler';
import { showModal } from '../../slices/userUiSlice';
import { setChannelWithActionId } from '../../slices/channelsSlice';
import { activeVariant, defaultVariant } from './constants';

const ChannelButtonWithAction = ({ id, name, isActive }) => {
  const dispatch = useDispatch();
  const handleSwitchChannel = useSwitchChannelHandler(id);
  const { t } = useTranslation();
  const buttonVariant = isActive ? activeVariant : defaultVariant;

  const handleShowModal = (modalType) => () => {
    dispatch(showModal({ isShown: true, modalType }));
  };

  return (
    <Dropdown
      as={ButtonGroup}
      className="d-flex"
      onToggle={() => dispatch(setChannelWithActionId(id))}
    >
      <Button
        variant={buttonVariant}
        onClick={handleSwitchChannel}
        className="w-100 rounded-0 text-start text-truncate"
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle
        split
        variant={buttonVariant}
        className="rounded-0"
      >
        <span className="visually-hidden">
          {t('channelManagement')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleShowModal('removeChannel')} href="#">
          {t('remove')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleShowModal('renameChannel')} href="#">
          {t('rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelButtonWithAction;
