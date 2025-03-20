import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../../../types';
import { NameSpace } from '../../const';
import { APIRoute } from '../../../const';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { dropToken } from '../../../services/api';

export type AuthDataType = {
  username: string;
  password: string;
};

export const postAuthData = createAsyncThunk<
  AuthDataType['username'],
  AuthDataType,
  AsyncThunkConfig
  >(`${NameSpace.Auth}/postAuthData`, async ({ username, password }, { extra: api }) => {
  try {
    const { data } = await api.post<AuthDataType>(APIRoute.LOGIN, {
      username,
      password
    });

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
    await api.delete<AuthDataType>(APIRoute.LOGOUT);

    dropToken();

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

export const checkAuth = createAsyncThunk<
  boolean,
  undefined,
  AsyncThunkConfig
>(`${NameSpace.Auth}/check-auth`, async (_args, { extra: api }) => {
  try {
    await api.get<AuthDataType>(APIRoute.CHECK_AUTH);

    return true
  } catch (error) {

    throw error;
  }
});