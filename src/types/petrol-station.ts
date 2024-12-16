import { ManagerType, TicketType, UserType } from ".";

export type PetrolStationType = {
  id: string;
  bush_id: string;
  managers?: ManagerType[];
  user?: UserType;
  tickets?: TicketType[];
};