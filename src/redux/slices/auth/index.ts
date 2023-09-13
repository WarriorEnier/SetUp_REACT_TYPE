import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { type AxiosResponse, type AxiosError } from 'axios';
import { type Thunk } from 'redux/store';

export interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
}

export interface Login {
  email: string;
  password: string;
}

const initialState: AuthState = {
  accessToken: null,
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setAccessToken, setIsLoading } = authSlice.actions;

export default authSlice.reducer;

export const login =
  (data: Login): Thunk =>
  async (dispatch): Promise<AxiosResponse | AxiosError> => {
    dispatch(setIsLoading(true));
    try {
      const res = await axiosInstance.post('/login', data);
      dispatch(setAccessToken(res.data.token));
      return res;
    } catch (error) {
      return error as AxiosError;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
