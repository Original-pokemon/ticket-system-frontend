import { CategoryType } from "./category";
import type { UserType } from "./user";

export type TaskPerformerType = {
  id: string;
  bush_id: string;
  category?: CategoryType[];
  category_id?: string;
  tickets?: string[];
  user: UserType;
};