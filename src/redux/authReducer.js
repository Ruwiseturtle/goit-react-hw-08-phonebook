import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  requestLogin,
  requestRegister,
  requestGetUser,
  setToken,
} from '../services/authAPI';
import { Notify } from 'notiflix';

//санка для логінізації
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    
    try {
      const response = await requestLogin(formData);
      return response; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      console.log(error);
      Notify.failure(error.code);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//санка для реєстрації
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
   
    try {
      const authData = await requestRegister(formData);
      return authData; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      Notify.failure('Enter the correct data in the form!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      setToken(token);
      const authData = await requestGetUser();

      return authData; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return false;
      return true;
    },
  }
);




const INITIAL_STATE = {
  token: null,
  user: {
    email: null,
    name: null,
  },
  authenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  // Ім'я слайсу
  name: 'auth',
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  reducers: {
    logOut(state) {
      state.token = null;
      state.user = {
        email: null,
        name: null,
      };
      state.authenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      // ---------- REGISTER USER ----------------
      .addCase(registerThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ---------- LOGIN USER ----------------
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ---------- REFRESH USER ----------------
      .addCase(refreshThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.user = action.payload;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;