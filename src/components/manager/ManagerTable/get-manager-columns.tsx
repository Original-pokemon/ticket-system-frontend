import { GridColDef } from "@mui/x-data-grid";

const getManagerColumns = (): GridColDef[] => [
  {
    field: 'userName',
    headerName: 'Менеджер',
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
    field: 'tasksUnderReview',
    headerName: 'Задачи на рассмотрении менеджера',
    type: 'number',
    width: 150,
  },
  {
    field: 'completedTasks',
    headerName: 'Исполненые задачи',
    type: 'number',
    width: 150,
  },
  {
    field: 'petrolStations',
    headerName: 'Кол-во АЗС',
    type: 'number',
    width: 150,
  },
];

export default getManagerColumns