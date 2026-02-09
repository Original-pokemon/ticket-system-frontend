import { create } from 'zustand';
import createAPI from '../../../services/api/api';
import { StatusType } from '../../../types';
import { Status } from '../../../const';
import { APIRoute } from '../../../const';
import { createSelectors } from '../../create-selectors';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { dropToken } from '../../../services/api';
import { TelegramUser } from '../../../types/telegram';

const api = createAPI();

export type AuthDataType = {
  username: string;
  password: string;
};

export type CheckAuthResponseType = {
  username: string;
  photo_url?: string;
};

interface State {
  status: StatusType;
  authData: boolean;
  currentUser: {
    name: string;
    username?: string;
    avatar: string;
  } | null;
}

interface Actions {
  setStatus: (status: StatusType) => void;
  setAuthData: (authData: boolean) => void;
  setCurrentUser: (user: State['currentUser']) => void;
  postAuthData: (data: AuthDataType) => Promise<string>;
  postTelegramAuth: (user: TelegramUser) => Promise<string>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
}

const authStore = create<State & Actions>((set, get) => ({
  status: Status.Idle,
  authData: false,
  currentUser: null,
  setStatus: (status) =>
    set(() => ({
      status,
    })),
  setAuthData: (authData) =>
    set(() => ({
      authData,
    })),
  setCurrentUser: (currentUser) =>
    set(() => ({
      currentUser,
    })),
  postAuthData: async ({ username, password }) => {
    const { setStatus, setAuthData, setCurrentUser } = get();
    setStatus(Status.Loading);
    try {
      const { data } = await api.post<AuthDataType>(APIRoute.LOGIN, {
        username,
        password,
      });
      setStatus(Status.Success);
      setAuthData(true);
      setCurrentUser({
        name: data.username,
        username: data.username,
        avatar: '/avatars/user.jpg',
      });
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
  postTelegramAuth: async (user: TelegramUser) => {
    const { setStatus, setAuthData, setCurrentUser } = get();
    setStatus(Status.Loading);
    try {
      const { data } = await api.post<TelegramUser>(
        APIRoute.TELEGRAM_LOGIN,
        user
      );
      setStatus(Status.Success);
      setAuthData(true);
      const userName =
        user.first_name + (user.last_name ? ' ' + user.last_name : '');
      setCurrentUser({
        name: userName,
        username: user.username,
        avatar: user.photo_url || '/avatars/user.jpg',
      });
      return user.first_name;
    } catch (error) {
      setStatus(Status.Error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        const toastId = 'telegram-auth-error';

        if (!toast.isActive(toastId)) {
          toast.warn('Ошибка авторизации через Telegram.', { toastId });
        }
      }
      throw error;
    }
  },
  logout: async () => {
    const { setStatus, setAuthData, setCurrentUser } = get();
    setStatus(Status.Loading);
    try {
      await api.delete<AuthDataType>(APIRoute.LOGOUT);
      dropToken();
      setStatus(Status.Success);
      setAuthData(false);
      setCurrentUser(null);
      return true;
    } catch (error) {
      setStatus(Status.Error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        const toastId = 'auth-error';

        if (!toast.isActive(toastId)) {
          toast.warn('Не удалось выйти из аккаунта, попробуйте ещё раз', {
            toastId,
          });
        }
      }
      throw error;
    }
  },
  checkAuth: async () => {
    const { setStatus, setAuthData, setCurrentUser } = get();
    setStatus(Status.Loading);
    try {
      const { data } = await api.get<CheckAuthResponseType>(
        APIRoute.CHECK_AUTH
      );
      setStatus(Status.Success);
      setAuthData(true);
      setCurrentUser({
        name: data.username,
        username: data.username,
        avatar: data.photo_url || '/avatars/user.jpg',
      });
      return true;
    } catch (error) {
      setStatus(Status.Error);
      throw error;
    }
  },
}));

export const useAuthStore = createSelectors(authStore);
