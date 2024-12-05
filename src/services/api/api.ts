import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (!error.response) {
        const errorResponseToastId = 'error-response';
        if (!toast.isActive(errorResponseToastId)) {
          toast.error('Произошла ошибка при выполнении запроса', {
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
            ErrorMessage[error.response.status as keyof typeof ErrorMessage],
          );
        }
      }

      throw error;
    },
  );


  return api;
};

export default createAPI;
