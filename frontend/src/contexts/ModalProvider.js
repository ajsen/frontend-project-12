import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import NewChannelForm from '../components/Modal/forms/NewChannelForm';
import RenameChannelForm from '../components/Modal/forms/RenameChannelForm';
import RemoveChannelDialog from '../components/Modal/dialogs/RemoveChannelDialog';
import { setModalIsShown } from '../slices/userUiSlice';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

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
    setModalTitle(modalTitlesByAction[modalAction]);
    setModalContent(modalContentsByAction[modalAction]);
    dispatch(setModalIsShown(true));
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
  )
};

export default ModalProvider;
