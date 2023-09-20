import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import JsonAxios from '../api/jsonAxios';

const initialState = {
  value: null,
  loading: false,
  error: '',
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await JsonAxios.get('/oauth/me');
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      sessionStorage.removeItem('accessToken');
      window.location.replace('/');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.value = { name: action.payload.data.nickname, role: action.payload.data.authorities[0].authority };
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.value = null;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
