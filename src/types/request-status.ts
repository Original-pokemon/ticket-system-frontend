import { Status } from '../const';

export type StatusType = (typeof Status)[keyof typeof Status];
