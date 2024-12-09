import { GridToolbar, DataGridProps, GridRowId } from '@mui/x-data-grid';
import { dataGridClasses, DataGridStyled } from './DataTable.style';

type Properties = {
  name?: string;
  pageSizeOptions?: (number | { value: number; label: string })[];
  pageSize?: number;
  disableColumnSorting?: boolean;
  onClick?: (id: GridRowId) => void;
} & DataGridProps;

function DataTable({
  name,
  onClick,
  density = 'comfortable',
  columns,
  rows,
  filterModel,
  loading,
  disableColumnSorting = false,
  pageSize,
  pageSizeOptions = [10, 25, 50],
  ...rest
}: Properties) {
  return (
    <DataGridStyled
      onRowClick={({ id }) => onClick && onClick(id)}
      rows={rows}
      columns={[...columns]}
      filterModel={filterModel}
      density={density}
      slots={{
        toolbar: GridToolbar,
        // footer:
      }}
      slotProps={{
        toolbar: {
          printOptions: { disableToolbarButton: true },
          csvOptions: {
            fileName: name,
            delimiter: ';',
            utf8WithBom: true,
          },
        },
      }}
      pageSizeOptions={pageSizeOptions}
      loading={loading}
      autosizeOptions={{
        expand: true,
        includeHeaders: false,
        includeOutliers: true,
      }}
      autosizeOnMount
      classes={{
        columnHeaderTitle: dataGridClasses.wrapHeader,
      }}
      disableRowSelectionOnClick
      disableDensitySelector
      disableColumnFilter
      disableColumnSorting={disableColumnSorting}
      disableColumnMenu
      disableVirtualization
      {...rest}
    />
  );
}

export default DataTable;
