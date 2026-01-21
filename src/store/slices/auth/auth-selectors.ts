import { useAuthStore } from './auth-store';
import { Status } from '../../../const';

export const useAuthStatus = () => {
  const status = useAuthStore.use.status();
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useAuthData = () => useAuthStore.use.authData();

export const useAuthActions = () => ({
  postAuthData: useAuthStore.use.postAuthData(),
  postTelegramAuth: useAuthStore.use.postTelegramAuth(),
  logout: useAuthStore.use.logout(),
  checkAuth: useAuthStore.use.checkAuth(),
});