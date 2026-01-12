import { ManagerType, TicketType, TicketStatusType } from '../../../types';
import { ManagerRow } from './get-manager-columns';

type GetManagerRowsProps = {
  managers: ManagerType[];
};

const reviewStatusId = '2';    // "На рассмотрении у менеджера"
const completedStatusId = '7'; // "Исполнена"

function getManagerRows({ managers }: GetManagerRowsProps): ManagerRow[] {
  return managers.map((manager) => {
    const managerTickets = manager.petrol_stations || [];

    // Собираем все ID задач
    const tickets = managerTickets.flatMap(mt => mt.tickets);
    const totalTasks = tickets.length;

    // Считаем задачи по статусам
    let tasksUnderReview = 0;   // статус '2'
    let completedTasks = 0;     // статус '7'

    for (const ticket of tickets) {
      if (ticket.status_id === reviewStatusId) {
        tasksUnderReview++;
      }
      if (ticket.status_id === completedStatusId) {
        completedTasks++;
      }
    }

    return {
      id: manager.id,
      userName: manager.user?.user_name || 'Не указано',
      totalTasks: totalTasks,
      tasksUnderReview,
      completedTasks,
      petrolStations: manager.petrol_stations?.length || 0,
    };
  });
}

export default getManagerRows