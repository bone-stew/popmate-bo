import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderTitle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHeaderTitle } = headerSlice.actions;
export const selectHeader = (state) => state.header;
export default headerSlice.reducer;
