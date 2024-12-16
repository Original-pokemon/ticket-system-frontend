import { GridColDef } from "@mui/x-data-grid";

const getCategoryColumns = (): GridColDef[] => [
  {
    field: 'description',
    headerName: 'Название категории',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'totalTasks',
    headerName: 'Всего задач',
    type: 'number',
    width: 120,
  },
  {
    field: 'inProgressTasks',
    headerName: 'Задачи в процессе',
    type: 'number',
    width: 150,
  },
  {
    field: 'completedTasks',
    headerName: 'Исполненные задачи',
    type: 'number',
    width: 150,
  },
  {
    field: 'performersCount',
    headerName: 'Кол-во исполнителей',
    type: 'number',
    width: 150,
  },
];

export default getCategoryColumns