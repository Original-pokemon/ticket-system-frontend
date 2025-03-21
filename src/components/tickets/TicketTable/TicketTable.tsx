import type { TicketType } from "../../../types";
import { useEffect } from "react";
import { fetchCategoriesData, fetchPetrolStationData, fetchStatusesData, getPetrolStationsStatus, getReferenceDataStatus, getTicketsStatus, selectAllCategories, selectAllPetrolStations, selectAllStatuses, selectAllTickets, selectCategoriesEntities, selectPetrolStationsEntities, selectStatusesEntities } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../hooks/state";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";
import ticketColumns from "./TicketColumns";
import Spinner from "../../Spinner/Spinner";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../const";

type TicketTableProps = {
  name: string,
  tickets: TicketType[],
  isLoading: boolean,
}

const TicketTable = ({ name, tickets, isLoading }: TicketTableProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const petrolStationsEntities = useAppSelector(selectPetrolStationsEntities);
  const categoriesEntities = useAppSelector(selectCategoriesEntities);
  const ticketStatusesEntities = useAppSelector(selectStatusesEntities);

  const { isIdle: isReferenceDataStatusIdle } = useAppSelector(getReferenceDataStatus)
  const { isIdle: isPetrolStationsStatusIdle } = useAppSelector(getPetrolStationsStatus)

  const isIdle = isReferenceDataStatusIdle || isPetrolStationsStatusIdle

  const columns = ticketColumns({
    categories: categoriesEntities,
    statuses: ticketStatusesEntities,
    petrolStations: petrolStationsEntities
  })

  const handleRowClick = (id: string | number, event: React.MouseEvent | undefined) => {
    const path = generatePath(AppRoute.Ticket, { id: String(id) });


    if (event?.ctrlKey || event?.metaKey) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    } 
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

export default TicketTable