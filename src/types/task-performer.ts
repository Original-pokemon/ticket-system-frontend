import type { UserType } from "./user";

export type TaskPerformerType = {
  id: string;
  bush_id: string;
  category_id?: string;
  tickets?: string[];
  user: UserType;
};