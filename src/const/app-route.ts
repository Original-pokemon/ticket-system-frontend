const AppRoute = {
  Tickets: '/tickets',
  Ticket: '/tickets/:id',
  Managers: '/managers',
  Manager: '/managers/:id',
  TaskPerformers: '/task-performers',
  TaskPerformer: '/task-performers/:id',
  PetrolStations: '/petrol-stations',
  PetrolStation: '/petrol-stations/:id',
  Login: '/login',
  PageNotFound: '*',
} as const;

export default AppRoute