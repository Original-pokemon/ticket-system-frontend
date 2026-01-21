import React, { useEffect, useRef } from 'react';
import { LoginButtonProps, TTelegramAuthLogin } from '../../types/telegram';
import { createScript } from '../../utils/telegram';

/**
 * It takes an object with a bunch of properties and assigns it to the global variable
 * `TelegramAuthLogin`
 *
 * @param {TTelegramAuthLogin} options - The options to set on the global variable.
 */
function initTelegramAuthLogin(options: TTelegramAuthLogin) {
  (window as any).TelegramAuthLogin = options;
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

  useEffect(() => {
    scriptRef.current?.remove();
    initTelegramAuthLogin({ onAuthCallback: props.onAuthCallback });
    scriptRef.current = createScript(props);
    hiddenDivRef.current?.after(scriptRef.current);
    const siblings = hiddenDivRef.current?.parentElement?.children || [];
    return () => {
      // destroy the script element on unmount
      scriptRef.current?.remove();
      // We also need to remove the rendered iframe
      for (const element of siblings) {
        if (element instanceof HTMLIFrameElement && element.src.includes('oauth.telegram.org')) {
          element.remove();
          break;
        }
      }
    };
  }, [props]);

  return <div ref={hiddenDivRef} hidden />;
}