import { AxiosInstance } from 'axios';
import { Status } from '../const';
import { AppDispatchType, StateType } from '.';

export type AsyncThunkConfig = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};

export type StatusType = (typeof Status)[keyof typeof Status];
