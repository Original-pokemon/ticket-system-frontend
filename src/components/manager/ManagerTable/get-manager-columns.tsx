import { ColumnDef } from "@tanstack/react-table"

export type ManagerRow = {
  id: string | number;
  userName: string;
  totalTasks: number;
  tasksUnderReview: number;
  completedTasks: number;
  petrolStations: number;
}

const getManagerColumns = (): ColumnDef<ManagerRow>[] => [
  {
    accessorKey: 'userName',
    header: 'Менеджер',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'totalTasks',
    header: 'Всего задач',
    cell: info => info.getValue<number>(),
  },
  {
    accessorKey: 'tasksUnderReview',
    header: 'Задачи на рассмотрении менеджера',
    cell: info => info.getValue<number>(),
  },
  {
    accessorKey: 'completedTasks',
    header: 'Исполненые задачи',
    cell: info => info.getValue<number>(),
  },
  {
    accessorKey: 'petrolStations',
    header: 'Кол-во АЗС',
    cell: info => info.getValue<number>(),
  },
];

export default getManagerColumns
