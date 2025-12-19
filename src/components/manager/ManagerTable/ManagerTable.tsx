import { useEffect } from "react";
import { useManagers, useManagersStatus, useUserManagementActions } from "../../../store";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";
import getManagerColumns from "./get-manager-columns";
import getManagerRows from "./get-manager-rows";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../const";
import Spinner from "../../Spinner/Spinner";

const columns = getManagerColumns()

const ManagerTable = () => {
  const navigate = useNavigate();
  const { fetchManagersData } = useUserManagementActions();
  const managers = useManagers();

  const managersStatus = useManagersStatus()

  const isSuccess = managersStatus.isSuccess
  const isLoading = managersStatus.isLoading

  const rows = isSuccess ? getManagerRows({
    managers,
  }) : []

  const handleRowClick = (id: string | number, event: React.MouseEvent | undefined) => {
    const path = generatePath(AppRoute.Manager, { id: String(id) });

    if (event?.ctrlKey || event?.metaKey) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    } 
  }

  useEffect(() => {
    if (managersStatus.isIdle) {
      fetchManagersData()
    }
  }, [managersStatus.isIdle, fetchManagersData])

  return isLoading ? <Spinner fullscreen={false} /> : (
    <DataTable
      name="managers"
      columns={columns}
      rows={rows}
      loading={isLoading}
      onClick={handleRowClick}
      disableToolBar
      disableFooter
    />
  )
}


export default ManagerTable