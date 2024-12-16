import { ManagerTicketType, PetrolStationType, TicketType, UserType } from ".";

export type ManagerType = {
  id: string;
  bush_id?: string;
  petrol_stations?: (PetrolStationType & { tickets: TicketType[] })[];
  user?: UserType;
};