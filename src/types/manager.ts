import { ManagerTicketType, UserType } from ".";

export type ManagerType = {
  id: string;
  bush_id?: string;
  tickets: ManagerTicketType[];
  petrol_stations?: string[];
  user?: UserType;
};