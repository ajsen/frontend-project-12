import { createSlice } from '@reduxjs/toolkit';

const defaultLng = 'ru';

const initialState = {
  currentLng: defaultLng,
  modalIsShown: false,
};

const userUiSlice = createSlice({
  name: 'userUi',
  initialState,
  reducers: {
    setModalIsShown: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.modalIsShown = action.payload;
    },
  },
});

export default userUiSlice.reducer;

export const { setModalIsShown } = userUiSlice.actions;
