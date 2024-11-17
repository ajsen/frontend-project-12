import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { ModalContext } from '../contexts';
import { setModalIsShown } from '../slices/userUiSlice';
import NewChannelForm from '../components/Modal/forms/NewChannelForm';
import RenameChannelForm from '../components/Modal/forms/RenameChannelForm';
import RemoveChannelDialog from '../components/Modal/dialogs/RemoveChannelDialog';

const modalContentsByAction = {
  addChannel: <NewChannelForm />,
  renameChannel: <RenameChannelForm />,
  removeChannel: <RemoveChannelDialog />,
};

const modalTitlesByAction = {
  addChannel: 'addChannel',
  renameChannel: 'renameChannel',
  removeChannel: 'removeChannel',
};

const ModalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const showModal = useCallback((e) => {
    const { modalAction } = e.currentTarget.dataset;
    dispatch(setModalIsShown(true));
    setModalTitle(modalTitlesByAction[modalAction]);
    setModalContent(modalContentsByAction[modalAction]);
  }, [dispatch]);

  const hideModal = useCallback(() => {
    dispatch(setModalIsShown(false));
    setModalTitle(null);
    setModalContent(null);
  }, [dispatch]);

  const value = useMemo(() => ({
    showModal,
    hideModal,
    modalTitle,
    modalContent,
  }), [
    showModal,
    hideModal,
    modalTitle,
    modalContent,
  ]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
