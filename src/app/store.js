import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import headerSlice from '../slices/headerSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    header: headerSlice,
  },
});
