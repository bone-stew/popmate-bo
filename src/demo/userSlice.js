import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../app/jsonAxios';

const initialState = {
  value: [],
  loading: false,
  error: '',
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await Axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      });
  },
});

export const {} = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
