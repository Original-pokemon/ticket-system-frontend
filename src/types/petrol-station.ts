import { UserType } from ".";

export type PetrolStationType = {
  id: string;
  bush_id?: string;
  managers?: string[];
  user?: UserType;
  tickets?: string[];
};