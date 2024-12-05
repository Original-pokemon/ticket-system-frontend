const AUTH_TOKEN_KEY_NAME = 'ticket_system_ortk_token';

export type Token = string;

export const saveToken = (token: string, rememberMe: boolean): void => {
  if (rememberMe) {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  }
};

export const getToken = (): string | null => {
  return (
    localStorage.getItem(AUTH_TOKEN_KEY_NAME) ||
    sessionStorage.getItem(AUTH_TOKEN_KEY_NAME)
  );
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  sessionStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
