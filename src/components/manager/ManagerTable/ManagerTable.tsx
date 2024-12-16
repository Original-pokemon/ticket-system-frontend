import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/state";
import { fetchManagersData, getManagersStatus, selectAllManagers } from "../../../store";
import { useRedirect } from "react-admin";
import Spinner from "../../Spinner/Spinner";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";
import getManagerColumns from "./get-manager-columns";
import getManagerRows from "./get-manager-rows";

const columns = getManagerColumns()

const ManagerTable = () => {
  const redirect = useRedirect();
  const dispatch = useAppDispatch();
  const managers = useAppSelector(selectAllManagers);

  const managersStatus = useAppSelector(getManagersStatus)

  const isSuccess = managersStatus.isSuccess
  const isLoading = managersStatus.isLoading

  const rows = isSuccess ? getManagerRows({
    managers,
  }) : []

  const handleRowClick = (id: string | number) => {
    // const path = generatePath(AppRoute.Ticket, { id: String(id) });
    redirect('show', 'manager', id);
  }

  useEffect(() => {
    if (managersStatus.isIdle) {
      dispatch(fetchManagersData())
    }
  }, [dispatch, managersStatus.isIdle])

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