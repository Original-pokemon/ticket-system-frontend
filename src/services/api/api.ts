import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { BACKEND_URL, REQUEST_TIMEOUT } from './const';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: false,
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Configure retry logic with exponential backoff
  axiosRetry(api, {
    retries: 3, // Maximum number of retry attempts
    retryDelay: axiosRetry.exponentialDelay, // Exponential backoff: 1s, 2s, 4s
    retryCondition: (error) => {
      // Retry on:
      // 1. Network errors (no connection)
      // 2. Timeout errors (ECONNABORTED)
      // 3. 5xx server errors
      // 4. Idempotent requests (GET, PUT, DELETE, HEAD, OPTIONS)
      const isTimeout = error.code === 'ECONNABORTED';
      const isNetworkError = axiosRetry.isNetworkError(error);
      const isIdempotentRequest = axiosRetry.isIdempotentRequestError(error);
      const is5xxError =
        error.response?.status !== undefined &&
        error.response.status >= 500 &&
        error.response.status < 600;

      return isTimeout || isNetworkError || (isIdempotentRequest && is5xxError);
    },
    onRetry: (retryCount, error, requestConfig) => {
      console.log(
        `Retry attempt ${retryCount} for ${requestConfig.url}`,
        error.code || error.message
      );
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      // Don't show error toast if axios-retry is retrying
      if (error.config && error.config['axios-retry']) {
        const retryCount = error.config['axios-retry'].retryCount || 0;
        const maxRetries = 3;

        // Only show error after all retries are exhausted
        if (retryCount < maxRetries) {
          throw error;
        }
      }

      if (!error.response) {
        const errorResponseToastId = 'error-response';
        if (!toast.isActive(errorResponseToastId)) {
          // Check if it's a timeout error
          const isTimeout = error.code === 'ECONNABORTED';
          const errorMessage = isTimeout
            ? 'Превышено время ожидания ответа от сервера'
            : 'Произошла ошибка при выполнении запроса';

          toast.error(errorMessage, {
            toastId: errorResponseToastId,
          });
        }
      }
      if (error.response && shouldDisplayError(error.response)) {
        const ErrorMessage = {
          [StatusCodes.BAD_REQUEST]: 'Некорректные данные.',
          [StatusCodes.UNAUTHORIZED]: 'Неверные имя пользователя или пароль.',
          [StatusCodes.NOT_FOUND]: 'Страница не найдена.',
          [StatusCodes.INTERNAL_SERVER_ERROR]: 'Внутренняя ошибка сервера.',
        };

        if (error.response.status in ErrorMessage) {
          toast.warn<string>(
            ErrorMessage[error.response.status as keyof typeof ErrorMessage]
          );
        }
      }

      throw error;
    }
  );

  return api;
};

export default createAPI;
