import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type PetrolStationRow = {
  id: string | number;
  petrolStationName: string;
  bushName: string;
  totalTasks: number;
  managers: string[];
}

const getPetrolStationColumns = (): ColumnDef<PetrolStationRow>[] => [
  {
    accessorKey: 'petrolStationName',
    header: 'АЗС',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'bushName',
    header: 'Куст',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'totalTasks',
    header: 'Задачи',
    cell: info => info.getValue<number>(),
  },
  {
    accessorKey: 'managers',
    header: 'Менеджер',
    cell: info => {
      const managers = info.getValue<string[]>();
      return (
        <div className="flex flex-wrap gap-1">
          {managers.map((manager) => (
            <Badge key={manager} variant="secondary">
              {manager}
            </Badge>
          ))}
        </div>
      );
    },
  },
];

export default getPetrolStationColumns;
