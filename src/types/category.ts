import { TaskPerformerType } from "./task-performer";

export type CategoryType = {
  id: string;
  description: string;
  task_performers: TaskPerformerType[];
}