import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../demo/counterSlice';
import userSlice from '../demo/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
});
