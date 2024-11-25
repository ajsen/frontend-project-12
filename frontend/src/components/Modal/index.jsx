import { Modal as BsModal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import useModalContent from '../../hooks/useModalContent';
import { hideModal } from '../../slices/userUiSlice';
import { selectModalIsShown, selectModalType } from '../../slices/selectors';

const Modal = () => {
  const dispatch = useDispatch();

  const modalIsShown = useSelector(selectModalIsShown);
  const modalType = useSelector(selectModalType);
  const { title, body } = useModalContent(modalType);

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
          {title}
        </BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>
        {body}
      </BsModal.Body>
    </BsModal>
  );
};

export default Modal;
