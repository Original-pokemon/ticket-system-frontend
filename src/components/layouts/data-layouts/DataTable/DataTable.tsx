import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  PaginationState,
  getSortedRowModel,
  OnChangeFn,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onClick?: (id: string | number, event?: React.MouseEvent) => void;
  dataType?: string;
  pageName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onClick,
  dataType,
  pageName,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);

  const pagination = useMemo<PaginationState>(() => {
    const pageIndexFromUrl = parseInt(searchParams.get("pageIndex") ?? "1", 10); // URL 1-based
    const pageSizeFromUrl = parseInt(searchParams.get("pageSize") ?? "20", 10);

    return {
      pageIndex: pageIndexFromUrl - 1, // table 0-based
      pageSize: pageSizeFromUrl,
    };
  }, [searchParams]);

  const onPaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const nextPagination = (typeof updater === "function") ? updater(pagination) : updater;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set("pageIndex", String(nextPagination.pageIndex + 1));
      newParams.set("pageSize", String(nextPagination.pageSize));
      return newParams;
    }, { replace: true });
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination
    },
    autoResetPageIndex: false,
  });

  const formatDate = (value: string | Date | undefined) => {
    if (!value) return 'Не указано';
    const date = typeof value === 'string' ? new Date(value) : value;
    return dayjs(date).format('DD.MM.YYYY');
  }

  const exportToExcel = () => {
    const headers = columns.map(col => typeof col.header === 'string' ? col.header : 'Header');
    const rows = data.map(row => {
      return columns.map(col => {
        let value: any;
        const colAny = col as any;
        if (colAny.accessorFn) {
          value = colAny.accessorFn(row);
        } else if (colAny.accessorKey) {
          value = (row as any)[colAny.accessorKey];
        } else {
          value = '';
        }
        // Apply formatting for date columns
        if (typeof col.header === 'string' && (col.header.includes('дата') || col.header.includes('Дата') || col.header.includes('date') || col.header.includes('Date'))) {
          value = formatDate(value);
        }
        return value;
      });
    });
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const currentDate = dayjs().format('YYYY-MM-DD');
    const filename = `ticket_system_${dataType || 'data'}_${pageName || 'page'}_${currentDate}.xlsx`;
    XLSX.writeFile(wb, filename);
  }

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={exportToExcel}
          className="hidden lg:flex"
        >
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table className="text-base">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(event) => onClick?.((row.original as any).id, event)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-26 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default DataTable;

