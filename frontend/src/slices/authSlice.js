import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { data } from 'react-router-dom';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/login', {
        username,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      return token;
    } catch (error) {
      return rejectWithValue('Неверный логин или пароль');
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (useRouteLoaderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'api/v1/signup',
        userData,
      )
      localStorage.setItem(
        'token',
        response.data.token
      )
      localStorage.setItem(
        'username',
        response.data.username,
      )
      return response.data
    } catch (error) {
      if (error.response.status === 409) {
        return rejectWithValue('Пользователь уже существует')
      }
      return rejectWithValue("Ошибка регистрации")
    }
  }
)

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('username')

      state.token = null;
      state.username = null
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuth = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signup.pending, (state) => {
        state.loading = true
        state.error = null11
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false

        state.token = action.payload.token
        state.username = action.payload.username
        state.isAuth = true
      })

      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
