import { CategoryType, TicketStatusType, TicketType } from "../../../types";
import { TaskPerformerType } from "../../../types/task-performer";

type CategoryTableRow = {
  id: string;
  description: string;
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  performersCount: number;
};

type CategoryColumnProperties = {
  categories: Record<string, CategoryType>;
  tickets: Record<string, TicketType>;
  performers: Record<string, TaskPerformerType>;
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
  performers,
  completedStatusId,
}: CategoryColumnProperties): CategoryTableRow[] => {
  const performersCountByCategory: Record<string, number> = {};

  for (const perf of Object.values(performers)) {
    if (perf.category_id) {
      performersCountByCategory[perf.category_id] = (performersCountByCategory[perf.category_id] || 0) + 1;
    }
  }

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
    const perfCount = performersCountByCategory[cat.id] || 0;
    return {
      id: cat.id,
      description: cat.description,
      totalTasks: stats.total,
      inProgressTasks: stats.inProgress,
      completedTasks: stats.completed,
      performersCount: perfCount,
    };
  });
}

export default getCategoryRows