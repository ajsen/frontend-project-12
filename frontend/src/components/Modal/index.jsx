import { useMemo } from 'react';
import { Modal as BsModal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { hideModal } from '../../slices/userUiSlice';
import { selectModalIsShown, selectModalType } from '../../slices/selectors';
import modals from './modals';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const modalIsShown = useSelector(selectModalIsShown);
  const modalType = useSelector(selectModalType);

  const { title, body } = useMemo(() => modals[modalType] || {}, [modalType]);

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  return (
    <BsModal
      show={modalIsShown}
      centered
      onHide={handleHideModal}
    >
      <BsModal.Header onHide={handleHideModal} closeButton>
        <BsModal.Title>
          {t(title)}
        </BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>
        {body}
      </BsModal.Body>
    </BsModal>
  );
};

export default Modal;
