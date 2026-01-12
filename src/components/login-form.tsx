import { useState } from 'react';
import { Controller, useForm, FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

type LoginFormData = {
  username: string;
  password: string;
};

const schema = yup.object({
  username: yup
    .string()
    .required('Логин обязателен.')
    .min(3, 'Логин должен содержать не менее 3 символов.')
    .trim(),
  password: yup
    .string()
    .required('Пароль обязателен.')
    .min(3, 'Пароль должен содержать не менее 3 символов.')
    .matches(/^\S*$/, 'Пароль не должен содержать пробелы.'),
});

interface LoginFormProps {
  postAuthData: (data: LoginFormData) => void;
  isLoading: boolean;
}

export function LoginForm({ postAuthData, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    delayError: 500,
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };

  const onSubmit = async (data: LoginFormData) => {
    postAuthData(data);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Вход в аккаунт</h1>
        <p className="text-balance text-lg text-muted-foreground">
          Введите ваш логин ниже, чтобы войти в аккаунт
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Логин</Label>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                id="username"
                type="text"
                placeholder="Ваш логин"
                required
                autoComplete="username"
                autoFocus
              />
            )}
          />
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                />
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading || !isValid}>
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
      </form>
    </div>
  );
}