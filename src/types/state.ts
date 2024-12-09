import type { Action, ThunkDispatch } from '@reduxjs/toolkit';
import createAPI from '../services/api/api';
import { store } from '../store';

export type StateType = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<
  StateType,
  ReturnType<typeof createAPI>,
  Action
>;

export type AppDispatchType = typeof store.dispatch;
