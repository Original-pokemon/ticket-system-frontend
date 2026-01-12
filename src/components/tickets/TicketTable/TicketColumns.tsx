import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { CategoryType, PetrolStationType, TicketStatusType, TicketType } from '../../../types';
import dayjs from 'dayjs';
import { ArrowUpDown } from "lucide-react"
import { Button } from '@/components/ui/button';

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

const formatDate = (value: string | Date | undefined) => {
  if (!value) return 'Не указано';
  const date = typeof value === 'string' ? new Date(value) : value;
  return dayjs(date).format('DD.MM.YYYY');
}

const getTicketColumns = ({ petrolStations, statuses, categories }: TicketColumnProperties): ColumnDef<TicketType>[] => {
  return [
    {
      accessorKey: 'title',
      header: "Название",
      size: 200,
    },
    {
      accessorKey: 'petrol_station_id',
      header: 'АЗС',
      accessorFn: (row) => getPetrolStationName(petrolStations, row.petrol_station_id),
      cell: (props) => <Badge variant="secondary">{props.getValue() as string}</Badge>,
      size: 120,
    },
    {
      accessorKey: 'status_id',
      header: 'Статус',
      accessorFn: (row) => getStatusName(statuses, row.status_id),
      cell: (props) => <Badge variant="secondary">{props.getValue() as string}</Badge>,
      size: 250,
    },
    {
      accessorKey: 'ticket_category',
      header: 'Категория',
      accessorFn: (row) => getCategoryName(categories, row.ticket_category || ''),
      cell: (props) => <Badge variant="secondary">{props.getValue() as string}</Badge>,
      size: 150,
    },
    {
      accessorKey: 'deadline',
      header: 'Заявленная дата исполнения',
      cell: (props) => formatDate(props.getValue() as string | Date),
      size: 200,
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Создана
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (props) => formatDate(props.getValue() as string),
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const a = new Date(rowA.getValue(columnId) as string);
        const b = new Date(rowB.getValue(columnId) as string);
        return a.getTime() - b.getTime();
      },
      size: 150,
    },
  ];
}
export default getTicketColumns;
