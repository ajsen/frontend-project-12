import { Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { plusSquare as plusSquareIcon } from '../../assets/icons';
import { useModal } from '../../contexts/ModalProvider';

const ChannelsHeader = () => {
  const { showModal } = useModal();
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('channels')}</b>
      <ButtonGroup
        className="p-0 text-primary"
        as={Button}
        variant="link"
        data-modal-action="addChannel"
        onClick={showModal}
        vertical
      >
        {plusSquareIcon}
        <span className="visually-hidden">+</span>
      </ButtonGroup>
    </div>
  );
};

export default ChannelsHeader;
