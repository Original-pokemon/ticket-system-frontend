import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip, Grid2, Stack } from "@mui/material";
import { ManagerType } from "../../../types";

const getPetrolStationColumns = (): GridColDef[] => [
  {
    field: 'petrolStationName',
    headerName: 'АЗС',
    minWidth: 170,
  },
  {
    field: 'bushName',
    headerName: 'Куст',
    minWidth: 170,
  },
  {
    field: 'totalTasks',
    headerName: 'Задачи',
    type: 'number',
    width: 120,
  },
  {
    field: 'managers',
    headerName: 'Менеджер',
    minWidth: 200,
    flex: 1,
    renderCell: (params: GridRenderCellParams<string[]>) => {
      const managers = params.value || [];
      return (
        <Grid2 container alignItems="center" flexWrap={"wrap"} spacing={1}>
          {managers.map((manager: string) => (
            <Grid2>
              <Chip key={manager} label={manager} />
            </Grid2>
          ))}
        </Grid2>
      );
    }
  },
];

export default getPetrolStationColumns;
