export const NameSpace = {
  App: 'app',
  Auth: 'auth', // Роуты: LOGIN, LOGOUT
  Ticket: 'ticket', // Роуты: TICKETS, STATUS_HISTORY, ATTACHMENT, COMMENT
  UserManagement: 'userManagement', // Роуты: USER, MANAGER, TASK_PERFORMER
  ReferenceData: 'referenceData', // Роуты: CATEGORIES, STATUS
  LocationData: 'locationData', // Роуты: PETROL_STATION, BUSH
} as const;