import {
  ExportButton,
  Exporter,
  SelectColumnsButton,
  TopToolbar,
  downloadCSV,
  useStore,
  useRedirect,
} from "react-admin";
import { Card, CardContent } from '@mui/material';
import { FilterSection } from "../../components/filter-section/filter-section";
import jsonExport from 'jsonexport/dist';
import { StoreKey } from "../../preload-data/preload-data";
import type { CategoryType, TicketType } from "../../types";
import { useEffect } from "react";
import { fetchCategoriesData, fetchPetrolStationData, fetchStatusesData, getCategoriesStatus, getPetrolStationsStatus, getReferenceDataStatus, getTicketsStatus, selectAllCategories, selectAllPetrolStations, selectAllStatuses, selectAllTickets } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import DataTable from "../../components/layouts/data-layouts/DataTable/DataTable";
import ticketColumns from "./TicketColumns";
import Spinner from "../../components/Spinner/Spinner";
import { AppRoute } from "../../const";

const TicketFilterSidebar = () => {
  const [categoryData] = useStore<CategoryType[]>(StoreKey.CATEGORY_DATA, []);
  const [statusData] = useStore<CategoryType[]>(StoreKey.STATUS_DATA, []);
  const [bushData] = useStore<CategoryType[]>(StoreKey.BUSH_DATA, []);

  const statusesOptions = statusData.map((status) => ({ label: status.description, value: status.id }))
  const bushListOptions = bushData.map((bush) => ({ label: bush.description, value: bush.id }))
  const categoriesOptions = categoryData?.map((category) => ({ label: category.description, value: category.id }))

  return (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 220 }}>
      <CardContent>
        <FilterSection
          label="Категория"
          icon={<ClassIcon />}
          filterKey="ticket_category"
          filterOptions={categoriesOptions}
        />

        <FilterSection
          label="Статус"
          icon={<LabelImportantIcon />}
          filterKey="status_id"
          filterOptions={statusesOptions}
        />

        <FilterSection
          label="Статус"
          icon={<LabelImportantIcon />}
          filterKey="bush_id"
          filterOptions={bushListOptions}
        />

      </CardContent>
    </Card>
  )
};

const exporter: Exporter = (tickets: TicketType[]) => {
  const ticketsForExport = tickets.map(ticket => {
    const { id, ...ticketForExport } = ticket;

    return ticketForExport;
  });

  jsonExport(ticketsForExport, {
    rowDelimiter: ';',
  }, (err, csv) => {
    downloadCSV(csv, 'tickets'); // download as 'posts.csv` file
  });
}

const TicketListActions = () => {
  return (
    <TopToolbar>
      <SelectColumnsButton />
      <ExportButton />
    </TopToolbar>
  )
}

type TicketTableProps = {
  name: string,
  tickets: TicketType[],
  isLoading: boolean,
}

export const TicketTable = ({ name, tickets, isLoading }: TicketTableProps) => {
  const redirect = useRedirect();
  const dispatch = useAppDispatch();
  const petrolStationsData = useAppSelector(selectAllPetrolStations);
  const categoriesData = useAppSelector(selectAllCategories);
  const ticketStatusesData = useAppSelector(selectAllStatuses);

  const { isIdle: isReferenceDataStatusIdle } = useAppSelector(getReferenceDataStatus)
  const { isIdle: isPetrolStationsStatusIdle } = useAppSelector(getPetrolStationsStatus)

  const isIdle = isReferenceDataStatusIdle || isPetrolStationsStatusIdle

  const columns = ticketColumns({
    categories: categoriesData,
    statuses: ticketStatusesData,
    petrolStations: petrolStationsData
  })

  const handleCellClick = (id: string | number) => {
    console.log('id :>> ', id);
    // const path = generatePath(AppRoute.Ticket, { id: String(id) });
    redirect('show', 'ticket', id);
  }

  useEffect(() => {
    if (isReferenceDataStatusIdle) {
      dispatch(fetchStatusesData())
      dispatch(fetchCategoriesData())
    }

    if (isPetrolStationsStatusIdle) {
      dispatch(fetchPetrolStationData())
    }
  })

  return isIdle ? <Spinner fullscreen={false} /> : (
    <DataTable
      name={name}
      columns={columns}
      rows={tickets}
      pageSizeOptions={[10, 100, 1000, { value: -1, label: 'Все' }]}
      loading={isLoading}
      onRowClick={handleCellClick}
    />
  )
}
