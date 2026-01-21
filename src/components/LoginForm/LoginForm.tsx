import { useState } from 'react';
import { Controller, useForm, FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { TelegramLoginButton } from '../TelegramLoginButton';
import { TelegramUser } from '../../types/telegram';

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
  onTelegramAuth: (user: TelegramUser) => void;
  isLoading: boolean;
}

export function LoginForm({ postAuthData, onTelegramAuth, isLoading }: LoginFormProps) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-center">
            <h1 className="text-4xl font-bold">Вход в аккаунт</h1>
          </FieldLegend>
          <Field>
            <FieldLabel htmlFor="username">Логин</FieldLabel>
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
            {errors.username && <FieldError className="text-sm text-red-500">{errors.username.message}</FieldError>}
          </Field>
          <Field >
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
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
            {errors.password && <FieldError className="text-sm text-red-500">{errors.password.message}</FieldError>}
          </Field>
          <Field>
            <Button type="submit" className="w-full" disabled={isLoading || !isValid}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </Field>
        </FieldSet>
        <FieldSeparator>Или продложите с</FieldSeparator>
        <Field className="items-center">
          <TelegramLoginButton
            botUsername='Ticket_system_ortk_bot'
            onAuthCallback={onTelegramAuth}
            lang="ru"
            buttonSize="large"
            showAvatar={false}
            requestAccess="write"
          />
        </Field>
      </FieldGroup>
    </form>
  );
}