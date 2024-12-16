import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../../../types';
import { NameSpace } from '../../const';
import { APIRoute } from '../../../const';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { saveToken } from '../../../services/api';

export type AuthDataType = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const postAuthData = createAsyncThunk<
  AuthDataType['username'],
  AuthDataType,
  AsyncThunkConfig
>(`${NameSpace.Auth}/postAuthData`, async (authData, { extra: api }) => {
  try {
    const { data } = await api.post<AuthDataType>(APIRoute.LOGIN, authData);

    // saveToken(token, rememberMe);

    return data.username;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const toastId = 'auth-error';

      if (!toast.isActive(toastId)) {
        toast.warn('Неверные имя пользователя или пароль.', { toastId });
      }
    }

    throw error;
  }
});

export const logout = createAsyncThunk<
  boolean,
  undefined,
  AsyncThunkConfig
>(`${NameSpace.Auth}/logout`, async (_args, { extra: api }) => {
  try {
    await api.post<AuthDataType>(APIRoute.LOGOUT);

    return true
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const toastId = 'auth-error';

      if (!toast.isActive(toastId)) {
        toast.warn('Не удалось выйти из аккаунта, попробуйте ещё раз', { toastId });
      }
    }

    throw error;
  }
});