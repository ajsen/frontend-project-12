import { createSlice } from '@reduxjs/toolkit';

const defaultLng = 'ru';

const initialState = {
  currentLng: defaultLng,
  modalIsShown: false,
  modalType: null,
};

const userUiSlice = createSlice({
  name: 'userUi',
  initialState,
  reducers: {
    showModal: (state, { payload: { isShown, modalType } }) => {
      // eslint-disable-next-line no-param-reassign
      state.modalIsShown = isShown;
      // eslint-disable-next-line no-param-reassign
      state.modalType = modalType;
    },
    hideModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.modalIsShown = false;
      // eslint-disable-next-line no-param-reassign
      state.modalType = null;
    },
  },
});

export default userUiSlice.reducer;

export const { showModal, hideModal } = userUiSlice.actions;
