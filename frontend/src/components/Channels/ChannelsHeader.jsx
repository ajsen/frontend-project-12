import { useDispatch } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { showModal } from '../../slices/userUiSlice';
import { plusSquare as plusSquareIcon } from '../../assets/icons';

const ChannelsHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('channels')}</b>
      <ButtonGroup
        className="p-0 text-primary"
        as={Button}
        variant="link"
        data-modal-action="addChannel"
        onClick={() => dispatch(showModal({
          isShown: true,
          modalType: 'addChannel',
        }))}
        vertical
      >
        {plusSquareIcon}
        <span className="visually-hidden">+</span>
      </ButtonGroup>
    </div>
  );
};

export default ChannelsHeader;
