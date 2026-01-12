import { ColumnDef } from "@tanstack/react-table"

export type CategoryTableRow = {
  id: string | number;
  description: string;
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  performersCount: number;
}

const getCategoryColumns = (): ColumnDef<CategoryTableRow>[] => [
  {
    accessorKey: 'description',
    header: 'Название категории',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'totalTasks',
    header: 'Всего задач',
    cell: info => info.getValue<number>(),
  },
  {
    accessorKey: 'inProgressTasks',
    header: 'Задачи в процессе',
    cell: info => info.getValue<number>(),
  },
  {
    accessorKey: 'completedTasks',
    header: 'Исполненные задачи',
    cell: info => info.getValue<number>(),
  },
  {
    accessorKey: 'performersCount',
    header: 'Кол-во исполнителей',
    cell: info => info.getValue<number>(),
  },
];

export default getCategoryColumns
