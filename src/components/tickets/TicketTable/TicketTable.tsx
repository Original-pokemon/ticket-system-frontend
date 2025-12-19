import type { TicketType } from "../../../types";
import { useEffect } from "react";
import { useCategoriesEntities, useLocationDataActions, usePetrolStationsEntities, usePetrolStationsStatus, useReferenceDataActions, useStatusesEntities, useStatusesStatus } from "../../../store";
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
  const { fetchPetrolStations } = useLocationDataActions()
  const { fetchCategoriesData, fetchStatusesData } = useReferenceDataActions()
  const navigate = useNavigate();
  const petrolStationsEntities = usePetrolStationsEntities()
  const categoriesEntities = useCategoriesEntities();
  const ticketStatusesEntities = useStatusesEntities();

  const { isIdle: isReferenceDataStatusIdle } = useStatusesStatus()
  const { isIdle: isPetrolStationsStatusIdle } = usePetrolStationsStatus()

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
      fetchCategoriesData()
      fetchStatusesData()
    }

    if (isPetrolStationsStatusIdle) {
      fetchPetrolStations()
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