import { create } from 'zustand';
import createAPI from '../../../services/api/api';
import { StatusType } from '../../../types';
import { Status } from '../../../const';
import { APIRoute } from '../../../const';
import { createSelectors } from '../../create-selectors';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { dropToken } from '../../../services/api';

const api = createAPI();

export type AuthDataType = {
  username: string;
  password: string;
};

interface State {
  status: StatusType;
  authData: boolean;
}

interface Actions {
  setStatus: (status: StatusType) => void;
  setAuthData: (authData: boolean) => void;
  postAuthData: (data: AuthDataType) => Promise<string>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
}

const authStore = create<State & Actions>((set, get) => ({
  status: Status.Idle,
  authData: false,
  setStatus: (status) =>
    set(() => ({
      status,
    })),
  setAuthData: (authData) =>
    set(() => ({
      authData,
    })),
  postAuthData: async ({ username, password }) => {
    const { setStatus, setAuthData } = get();
    setStatus(Status.Loading);
    try {
      const { data } = await api.post<AuthDataType>(APIRoute.LOGIN, {
        username,
        password
      });
      setStatus(Status.Success);
      setAuthData(true);
      return data.username;
    } catch (error) {
      setStatus(Status.Error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        const toastId = 'auth-error';

        if (!toast.isActive(toastId)) {
          toast.warn('Неверные имя пользователя или пароль.', { toastId });
        }
      }
      throw error;
    }
  },
  logout: async () => {
    const { setStatus, setAuthData } = get();
    setStatus(Status.Loading);
    try {
      await api.delete<AuthDataType>(APIRoute.LOGOUT);
      dropToken();
      setStatus(Status.Success);
      setAuthData(false);
      return true;
    } catch (error) {
      setStatus(Status.Error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        const toastId = 'auth-error';

        if (!toast.isActive(toastId)) {
          toast.warn('Не удалось выйти из аккаунта, попробуйте ещё раз', { toastId });
        }
      }
      throw error;
    }
  },
  checkAuth: async () => {
    const { setStatus, setAuthData } = get();
    setStatus(Status.Loading);
    try {
      await api.get<AuthDataType>(APIRoute.CHECK_AUTH);
      setStatus(Status.Success);
      setAuthData(true);
      return true;
    } catch (error) {
      setStatus(Status.Error);
      throw error;
    }
  },
}));

export const useAuthStore = createSelectors(authStore);