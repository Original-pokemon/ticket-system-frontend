import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { CategoryType, PetrolStationType, TicketStatusType } from '../../types';
import dayjs from 'dayjs';

type TicketColumnProperties = {
  petrolStations: PetrolStationType[];
  statuses: TicketStatusType[];
  categories: CategoryType[];
};

const getTicketColumns = ({ petrolStations, statuses, categories }: TicketColumnProperties): GridColDef[] => [
  {
    field: 'title',
    headerName: 'Название',
    width: 300,
  },
  {
    field: 'petrol_station_id',
    headerName: 'АЗС',
    width: 120,
    valueGetter: (value: string) => {
      return petrolStations.find(({ id }) => id === value)?.user?.user_name || 'Не указано'
    },
    renderCell: (params: GridRenderCellParams) => (
      <Chip label={params.value} />
    ),
  },
  {
    field: 'status_id',
    headerName: 'Статус',
    width: 250,
    valueGetter: (value: string) => {
      return statuses.find(({ id }) => id === value)?.description || 'Не указано'
    },
    renderCell: (params: GridRenderCellParams) => (
      <Chip label={params.value} />
    ),
  },
  {
    field: 'ticket_category',
    headerName: 'Категория',
    width: 150,
    valueGetter: (value: string) => {
      return categories.find(({ id }) => id === value)?.description || 'Не указано'
    },
    renderCell: (params: GridRenderCellParams) => (
      <Chip label={params.value} />
    ),
  },
  {
    field: 'deadline',
    headerName: 'Заявленная дата исполнения',
    width: 200,
    valueGetter: (value: string) => value ? new Date(value) : undefined,
    valueFormatter: (value) => value ? dayjs(value).format('DD.MM.YYYY') : 'Не указано',
  },
  {
    field: 'created_at',
    headerName: 'Создана',
    width: 150,
    // sortable: false,
    // sortComparator: (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    valueGetter: (value: string) =>
      value ? new Date(value) : 'Не указано',
    valueFormatter: (value) => dayjs(value).format('DD.MM.YYYY'),
  },
];

export default getTicketColumns;
