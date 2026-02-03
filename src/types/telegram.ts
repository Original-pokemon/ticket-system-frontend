export type CreateScriptOptions = {
  authCallbackUrl?: string;
  botUsername: string;
  buttonSize?: 'small' | 'medium' | 'large';
  cornerRadius?: number;
  lang?: string;
  onAuthCallback?: (user: TelegramUser) => void;
  requestAccess?: 'write' | false;
  showAvatar?: boolean;
  widgetVersion?: number;
};

export type LoginButtonProps = Omit<CreateScriptOptions, 'onAuthCallback'> & {
  onAuthCallback: (user: TelegramUser) => void;
};

export type TTelegramAuthLogin = {
  onAuthCallback: (user: TelegramUser) => void;
};

export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};