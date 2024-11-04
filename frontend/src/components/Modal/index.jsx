import { Modal as BsModal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useModal } from '../../contexts/ModalProvider';
import { selectModalIsShown } from '../../slices/userUiSlice';

const Modal = () => {
  const { t } = useTranslation();
  const modalIsShown = useSelector(selectModalIsShown);
  const {
    hideModal,
    modalTitle,
    modalContent,
  } = useModal();

  return (
    <BsModal
      show={modalIsShown}
      centered
      onHide={hideModal}
    >
      <BsModal.Header onHide={hideModal} closeButton>
        <BsModal.Title>
          {t(modalTitle)}
        </BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>
        {modalContent}
      </BsModal.Body>
    </BsModal>
  );
};

export default Modal;
