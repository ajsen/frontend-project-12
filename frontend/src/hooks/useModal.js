import { useContext } from 'react';

import { ModalContext } from '../contexts';

const useModal = () => useContext(ModalContext);

export default useModal;
