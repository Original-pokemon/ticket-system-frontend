import { useEffect } from "react";
import { usePetrolStations, useBushesEntities, useLocationDataStatus, useLocationDataActions, useManagersEntities, useManagersStatus, useUserManagementActions } from "../../../store";
import Spinner from "../../Spinner/Spinner";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";
import getPetrolStationColumns from "./get-petrol-station-columns";
import { getPetrolStationsRows } from "./get-petrol-station-rows";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../const";

const columns = getPetrolStationColumns()

const PetrolStationTable = () => {
  const navigate = useNavigate();
  const { fetchPetrolStations, fetchBushes } = useLocationDataActions();
  const { fetchManagersData } = useUserManagementActions();
  const petrolStations = usePetrolStations();
  const managers = useManagersEntities();
  const bushesData = useBushesEntities();

  const locationDataStatus = useLocationDataStatus();
  const managersStatus = useManagersStatus();

  const isSuccess = managersStatus.isSuccess || locationDataStatus.isSuccess
  const isLoading = managersStatus.isLoading || locationDataStatus.isLoading

  const rows = isSuccess ? getPetrolStationsRows({
    petrolStations,
    managers,
    bushes: bushesData
  }) : []

  const handleRowClick = (id: string | number, event: React.MouseEvent | undefined) => {
    const path = generatePath(AppRoute.PetrolStation, { id: String(id) });

    if (event?.ctrlKey || event?.metaKey) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    } 
  }

  useEffect(() => {
    if (locationDataStatus.isIdle) {
      fetchPetrolStations();
      fetchBushes();
    }

    if (managersStatus.isIdle) {
      fetchManagersData();
    }
  }, [locationDataStatus.isIdle, managersStatus.isIdle, fetchPetrolStations, fetchBushes, fetchManagersData]);

  return isLoading ? <Spinner fullscreen={false} /> : (
    <DataTable
      pageName="petrol_stations"
      columns={columns}
      data={rows}
      onClick={handleRowClick}
    />
  )
}


export default PetrolStationTable