import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import api from "./mockAPI";

export interface User {
  name: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

const STORAGE_KEY = "user";

const initUser = () => {
  const user = sessionStorage.getItem(STORAGE_KEY);
  if (!user) return null;
  return JSON.parse(user);
};

const initialState: AuthState = {
  user: initUser(),
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await api.login(username);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await api.register(username);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem(STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
        state.loading = false;
      })
      .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(login.rejected, register.rejected), (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export const getUser = (state: RootState) => state.auth.user;
export const isLoading = (state: RootState) => state.auth.loading;

export default authSlice.reducer;
