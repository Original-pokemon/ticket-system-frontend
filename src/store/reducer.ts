import { combineReducers } from '@reduxjs/toolkit';

import { authReducer, locationDataReducer, referenceDataReducer, userManagementReducer } from '.';
import { ticketReducer } from './slices/ticket';
import { NameSpace } from './const';

const reducer = combineReducers({
  [NameSpace.LocationData]: locationDataReducer,
  [NameSpace.ReferenceData]: referenceDataReducer,
  [NameSpace.Auth]: authReducer,
  [NameSpace.UserManagement]: userManagementReducer,
  [NameSpace.Ticket]: ticketReducer
});

export type InitialStateType = ReturnType<typeof reducer>;

export { reducer };
