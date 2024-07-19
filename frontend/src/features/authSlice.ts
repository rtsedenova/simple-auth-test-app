import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthState { 
  token: string | null;
  lastActive: number | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  lastActive: Date.now(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.lastActive = Date.now();
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.lastActive = null;
      localStorage.removeItem('token');
    },
    updateLastActive: (state) => {
      state.lastActive = Date.now(); 
    },
  },
});

export const { login, logout, updateLastActive } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectLastActive = (state: RootState) => state.auth.lastActive;
export default authSlice.reducer;
