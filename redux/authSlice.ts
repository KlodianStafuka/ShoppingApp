import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'; // Import Dispatch
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        AsyncStorage.setItem('isAuthenticated', 'true');
      } else {
        state.isAuthenticated = false;
        state.error = 'Invalid username or password'; 
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.removeItem('isAuthenticated');
    },
    setAuthState(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuthState } = authSlice.actions;

export const loadAuthState = () => async (dispatch: Dispatch) => {
  try {
    const value = await AsyncStorage.getItem('isAuthenticated');
    dispatch(setAuthState(value === 'true'));
  } catch (error) {
    console.error('Failed to load auth state:', error);
  }
};

export default authSlice.reducer;
