import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthData, useAuthStatus, useAuthActions } from '../../store';
import Spinner from '../../components/Spinner/Spinner';
import { AppRoute } from '../../const';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import Logo from '../../components/logo/Logo';
import { TelegramUser } from '../../types/telegram';

function Login() {
  const { isSuccess, isLoading } = useAuthStatus();
  const isAuth = useAuthData();
  const { postAuthData, postTelegramAuth } = useAuthActions();
  const navigate = useNavigate();

  const handleTelegramAuth = async (user: TelegramUser) => {
    await postTelegramAuth(user);
  };

  useEffect(() => {
    if (isSuccess && isAuth) {
      navigate(AppRoute.Tickets);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo size="md" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {isLoading && <Spinner fullscreen size={70} />}
            <LoginForm
              postAuthData={postAuthData}
              onTelegramAuth={handleTelegramAuth}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/login-bg.webp"
          alt="Login background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
}

export default Login;
