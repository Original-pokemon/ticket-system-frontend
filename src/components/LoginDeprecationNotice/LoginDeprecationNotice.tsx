import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LoginDeprecationNotice() {
  return (
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Уведомление</AlertTitle>
      <AlertDescription>
        С <strong>13 февраля 2026 г.</strong> авторизация по логину и паролю
        будет отключена. Вход осуществляется только через Telegram. Убедитесь в
        наличии доступа к боту.
      </AlertDescription>
    </Alert>
  );
}
