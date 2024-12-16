import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/state";
import { fetchBushData, fetchCategoriesData, fetchManagersData, fetchPetrolStationData, fetchTaskPerformersData, fetchTicketsData, getCategoriesStatus, getLocationDataStatus, getManagersStatus, getPetrolStationsStatus, getTaskPerformersStatus, getTicketsStatus, selectAllManagers, selectAllPetrolStations, selectBushesEntities, selectCategoriesEntities, selectManagersEntities, selectPetrolStationsEntities, selectTaskPerformersEntities, selectTicketsEntities } from "../../../store";
import { useRedirect } from "react-admin";
import Spinner from "../../Spinner/Spinner";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";
import getPetrolStationColumns from "./get-petrol-station-columns";
import { getPetrolStationsRows } from "./get-petrol-station-rows";

const columns = getPetrolStationColumns()

const PetrolStationTable = () => {
  const redirect = useRedirect();
  const dispatch = useAppDispatch();
  const petrolStations = useAppSelector(selectAllPetrolStations);
  const managers = useAppSelector(selectManagersEntities);
  const bushesData = useAppSelector(selectBushesEntities);

  const locationDataStatus = useAppSelector(getLocationDataStatus)
  const managersStatus = useAppSelector(getManagersStatus)

  const isSuccess = managersStatus.isSuccess || locationDataStatus.isSuccess
  const isLoading = managersStatus.isLoading || locationDataStatus.isLoading

  const rows = isSuccess ? getPetrolStationsRows({
    petrolStations,
    managers,
    bushes: bushesData
  }) : []

  const handleRowClick = (id: string | number) => {
    // const path = generatePath(AppRoute.Ticket, { id: String(id) });
    redirect('show', 'petrol-station', id);
  }

  useEffect(() => {
    if (locationDataStatus.isIdle) {
      dispatch(fetchPetrolStationData())
      dispatch(fetchBushData())
    }

    if (managersStatus.isIdle) {
      dispatch(fetchManagersData())
    }
  }, [dispatch, locationDataStatus.isIdle])

  return isLoading ? <Spinner fullscreen={false} /> : (
    <DataTable
      name="petrolStations"
      columns={columns}
      rows={rows}
      loading={isLoading}
      onClick={handleRowClick}
      pageSize={-1}
      disableToolBar
      disableFooter
    />
  )
}


export default PetrolStationTable