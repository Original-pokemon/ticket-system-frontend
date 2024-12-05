const APIRoute = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  TICKETS: "/ticket",
  TICKET: (ticketId: string) => `/ticket/${ticketId}`,
  CATEGORIES: "/category",
  STATUS: "/status",
  PETROL_STATION: "/petrol-station",
  BUSH: "/bush",
  USERS: "/user",
  USER: (userId: string) => `/user/${userId}`,
  MANAGERS: "/manager",
  MANAGER: (managerId: string) => `/manager/${managerId}`,
  TASK_PERFORMERS: "/task-performer",
  TASK_PERFORMER: (taskPerformerId: string) => `/manager/${taskPerformerId}`,
  STATUS_HISTORY: '/status-history',
  ATTACHMENT: '/attachment',
  COMMENT: '/comment',
} as const

export default APIRoute