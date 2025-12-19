import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { useAuthData, useAuthStatus, useAuthActions } from '../../store';
import { AppRoute } from '../../const';

function AuthGuard(): React.JSX.Element {
  const navigate = useNavigate();
  const { isIdle, isError, isLoading } = useAuthStatus();
  const isAuth = useAuthData();
  const { checkAuth, logout } = useAuthActions();

  useEffect(() => {
    if (isIdle) {
      checkAuth();
    }

    if (isError) {
      logout();
      navigate(AppRoute.Login);
    }

  }, [isIdle, isError, navigate, checkAuth, logout]);

  if (isLoading || !isAuth) {
    return <Spinner fullscreen size={100} />;
  }

  return <Outlet />;
}

export default AuthGuard;
