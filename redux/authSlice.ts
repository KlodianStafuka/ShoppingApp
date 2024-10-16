import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USERNAME, PASSWORD } from '../utils/constants';

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      const { username, password } = action.payload;
      if (username === USERNAME && password === PASSWORD) {
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.error = 'Invalid username or password'; 
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

