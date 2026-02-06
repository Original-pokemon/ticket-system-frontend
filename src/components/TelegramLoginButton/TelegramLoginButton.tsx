import { useEffect, useRef } from 'react';
import { LoginButtonProps, TTelegramAuthLogin } from '../../types/telegram';
import { createScript } from '../../utils/telegram';

declare global {
  interface Window {
    TelegramAuthLogin?: TTelegramAuthLogin;
  }
}

/**
 * It takes an object with a bunch of properties and assigns it to the global variable
 * `TelegramAuthLogin`
 *
 * @param {TTelegramAuthLogin} options - The options to set on the global variable.
 */
function initTelegramAuthLogin(options: TTelegramAuthLogin) {
  window.TelegramAuthLogin = options;
}

/**
 * A React component that renders a Telegram login button.
 *
 * @see https://core.telegram.org/widgets/login
 *
 * @param {LoginButtonProps} props The props to pass to the component.
 * @returns A React component that renders the Telegram login button.
 */
export function TelegramLoginButton(props: LoginButtonProps) {
  const hiddenDivRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement>();

  const {
    onAuthCallback,
    botUsername,
    buttonSize,
    cornerRadius,
    lang,
    requestAccess,
    showAvatar,
    widgetVersion,
    authCallbackUrl,
  } = props;

  useEffect(() => {
    scriptRef.current?.remove();
    initTelegramAuthLogin({ onAuthCallback });
    scriptRef.current = createScript(props);
    hiddenDivRef.current?.after(scriptRef.current);

    return () => {
      // destroy the script element on unmount
      scriptRef.current?.remove();
      // We also need to remove the rendered iframe
      const siblings = hiddenDivRef.current?.parentElement?.children || [];
      for (const element of siblings) {
        if (
          element instanceof HTMLIFrameElement &&
          element.src.includes('oauth.telegram.org')
        ) {
          element.remove();
          break;
        }
      }
    };
  }, [
    onAuthCallback,
    botUsername,
    buttonSize,
    cornerRadius,
    lang,
    requestAccess,
    showAvatar,
    widgetVersion,
    authCallbackUrl,
  ]);

  return <div ref={hiddenDivRef} hidden />;
}
