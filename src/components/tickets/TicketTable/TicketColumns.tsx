import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { CategoryType, PetrolStationType, TicketStatusType } from '../../../types';
import dayjs from 'dayjs';

type TicketColumnProperties = {
  petrolStations: Record<string, PetrolStationType>;
  statuses: Record<string, TicketStatusType>;
  categories: Record<string, CategoryType>;
};

const getPetrolStationName = (petrolStations: Record<string, PetrolStationType>, id: string) => {
  const station = petrolStations[id];
  return station?.user?.user_name || 'Не указано'
}

const getStatusName = (statuses: Record<string, TicketStatusType>, id: string) => {
  return statuses[id]?.description || 'Не указано'
}

const getCategoryName = (categories: Record<string, CategoryType>, id: string) => {
  return categories[id]?.description || 'Не указано'
}

const getDate = (value: Date | string | undefined) => {
  return value ? new Date(value) : undefined;
}

const formatDate = (value: Date | string | undefined) => {
  if (!value || typeof value === 'string') return 'Не указано';
  return dayjs(value).format('DD.MM.YYYY');
}

const getTicketColumns = ({ petrolStations, statuses, categories }: TicketColumnProperties): GridColDef[] => {
  const renderChip = (params: GridRenderCellParams) => <Chip label={params.value} />;
  return [
    {
      field: 'title',
      headerName: 'Название',
      width: 200,
    },
    {
      field: 'petrol_station_id',
      headerName: 'АЗС',
      width: 120,
      valueGetter: (value: string) => getPetrolStationName(petrolStations, value),
      renderCell: renderChip,
    },
    {
      field: 'status_id',
      headerName: 'Статус',
      width: 250,
      valueGetter: (value: string) => getStatusName(statuses, value),
      renderCell: renderChip,
    },
    {
      field: 'ticket_category',
      headerName: 'Категория',
      width: 150,
      valueGetter: (value: string) => getCategoryName(categories, value),
      renderCell: renderChip,
    },
    {
      field: 'deadline',
      headerName: 'Заявленная дата исполнения',
      width: 200,
      valueGetter: (value: string) => getDate(value),
      valueFormatter: (value) => formatDate(value),
    },
    {
      field: 'created_at',
      headerName: 'Создана',
      width: 150,
      valueGetter: (value: string) => getDate(value),
      valueFormatter: (value) => formatDate(value),
    },
  ];
}
export default getTicketColumns;
