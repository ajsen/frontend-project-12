import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import NewChannelForm from '../components/Modal/NewChannelForm';
import RemoveChannelDialog from '../components/Modal/RemoveChannelDialog';
import RenameChannelForm from '../components/Modal/RenameChannelForm';

const modalContentByType = {
  addChannel: { title: 'addChannel', body: <NewChannelForm /> },
  removeChannel: { title: 'removeChannel', body: <RemoveChannelDialog /> },
  renameChannel: { title: 'renameChannel', body: <RenameChannelForm /> },
};
const initialState = { title: null, body: null };

const useModalContent = (modalType) => {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = useState(initialState);

  useEffect(() => {
    if (!modalType) {
      setModalContent(initialState);
      return;
    }

    const { title, body } = modalContentByType[modalType];
    setModalContent((prev) => ({
      ...prev,
      title: t(title),
      body,
    }));
  }, [modalType, t]);

  return modalContent;
};

export default useModalContent;
