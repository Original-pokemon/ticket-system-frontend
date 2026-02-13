import { CategoryType, TicketType } from "../../../types";
import { TaskPerformerType } from "../../../types/task-performer";
import { CategoryTableRow } from "./get-category-columns";

type CategoryColumnProperties = {
  categories: Record<string, CategoryType>;
  tickets: Record<string, TicketType>;
  completedStatusId: string;
};

type CategoryStats = {
  total: number;
  completed: number;
  inProgress: number;
};

const getCategoryRows = ({
  categories,
  tickets,
  completedStatusId,
}: CategoryColumnProperties): CategoryTableRow[] => {

  const tasksStatsByCategory: Record<string, CategoryStats> = {};

  for (const ticket of Object.values(tickets)) {
    const catId = ticket.ticket_category;

    if (!catId) continue;

    if (!tasksStatsByCategory[catId]) {
      tasksStatsByCategory[catId] = { total: 0, completed: 0, inProgress: 0 };
    }

    tasksStatsByCategory[catId].total += 1;

    if (completedStatusId === ticket.status_id) {
      tasksStatsByCategory[catId].completed += 1;
    } else {
      tasksStatsByCategory[catId].inProgress += 1;
    }
  }

  return Object.values(categories).map((cat) => {
    const stats = tasksStatsByCategory[cat.id] || { total: 0, completed: 0, inProgress: 0 };
    return {
      id: cat.id,
      description: cat.description,
      totalTasks: stats.total,
      inProgressTasks: stats.inProgress,
      completedTasks: stats.completed,
      performersCount: cat.task_performers?.length || 0,
    };
  });
}

export default getCategoryRows