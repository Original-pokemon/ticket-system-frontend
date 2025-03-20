import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { checkAuth, getAuthData, getAuthStatus, logout } from '../../store';
import { AppRoute } from '../../const';

function AuthGuard(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isIdle, isError, isLoading } = useAppSelector(getAuthStatus);
  const isAuth = useAppSelector(getAuthData);

  useEffect(() => {
    if (isIdle) {
      dispatch(checkAuth());
    }

    if (isError) {
      dispatch(logout());
      navigate(AppRoute.Login);
    }

  }, [dispatch, isIdle, isError, navigate,]);

  if (isLoading || !isAuth) {
    return <Spinner fullscreen size={100} />;
  }

  return <Outlet />;
}

export default AuthGuard;
