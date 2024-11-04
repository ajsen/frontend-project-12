import {
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useButtonVariant from '../../hooks/useChannelButtonVariant';
import useSwitchChannelHandler from '../../hooks/useSwitchChannelHandler';
import { useModal } from '../../contexts/ModalProvider';
import { setChannelWithActionId } from '../../slices/channelsSlice';

const ChannelButtonWithAction = ({ id, name }) => {
  const dispatch = useDispatch();
  const handleSwitchChannel = useSwitchChannelHandler(id);
  const buttonVariant = useButtonVariant(id);
  const { showModal } = useModal();
  const { t } = useTranslation();

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
      />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={showModal}
          href="#"
          data-modal-action="removeChannel"
        >
          {t('remove')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={showModal}
          href="#"
          data-modal-action="renameChannel"
        >
          {t('rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelButtonWithAction;
