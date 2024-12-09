import { useRedirect } from "react-admin";
import type { TicketType } from "../../types";
import { useEffect } from "react";
import { fetchCategoriesData, fetchPetrolStationData, fetchStatusesData, getCategoriesStatus, getPetrolStationsStatus, getReferenceDataStatus, getTicketsStatus, selectAllCategories, selectAllPetrolStations, selectAllStatuses, selectAllTickets } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import DataTable from "../../components/layouts/data-layouts/DataTable/DataTable";
import ticketColumns from "./TicketColumns";
import Spinner from "../../components/Spinner/Spinner";

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

  const handleRowClick = (id: string | number) => {
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
      onClick={handleRowClick}
    />
  )
}
