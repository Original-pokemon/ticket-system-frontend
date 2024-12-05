import { configureStore } from '@reduxjs/toolkit';

import createAPI from '../services/api/api';
import { reducer } from './reducer';

export const NameSpace = {
  App: 'app',
  Auth: 'auth', // Роуты: LOGIN, LOGOUT
  Ticket: 'ticket', // Роуты: TICKETS, STATUS_HISTORY, ATTACHMENT, COMMENT
  UserManagement: 'userManagement', // Роуты: USER, MANAGER, TASK_PERFORMER
  ReferenceData: 'referenceData', // Роуты: CATEGORIES, STATUS
  LocationData: 'locationData', // Роуты: PETROL_STATION, BUSH
} as const;

const api = createAPI();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export * from './slices';

export default store;
