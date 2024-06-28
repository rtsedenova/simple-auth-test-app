import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface User { 
  id: string;
  nickname: string;
  email: string;
  password: string;
}

export interface UserState { 
  users: User[];
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem('users') || '[]'),
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
  },
});

export const { addUser } = userSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;
export default userSlice.reducer;
