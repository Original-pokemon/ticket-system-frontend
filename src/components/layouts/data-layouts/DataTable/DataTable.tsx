import { GridToolbar, DataGridProps, GridRowId } from '@mui/x-data-grid';
import { dataGridClasses, DataGridStyled } from './DataTable.style';

type Properties = {
  name?: string;
  pageSizeOptions?: (number | { value: number; label: string })[];
  pageSize?: number;
  disableColumnSorting?: boolean;
  disableToolBar?: boolean;
  disableFooter?: boolean;
  onClick?: (id: GridRowId, event?: React.MouseEvent) => void;
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
  disableToolBar = false,
  disableFooter = false,
  pageSize,
  pageSizeOptions = [10, 25, 50],
  ...rest
}: Properties) {
  return (
    <DataGridStyled
      onRowClick={({ id }, event) => onClick && onClick(id, event)}
      rows={rows}
      columns={[...columns]}
      filterModel={filterModel}
      density={density}
      slots={{
        toolbar: disableToolBar ? null : GridToolbar,
        footer: disableFooter ? () => null : undefined,
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
