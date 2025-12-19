import { useEffect } from "react";
import { AppRoute, Status } from "../../../const";
import { useCategoriesEntities, useCategoriesStatus, useReferenceDataActions, useTicketsEntities, useTicketsStatus, useTicketActions, useUserManagementActions, useTaskPerformersEntities, useTaskPerformersStatus } from "../../../store";
import getCategoryRows from "./get-category-rows";
import getCategoryColumns from "./get-category-columns";
import Spinner from "../../Spinner/Spinner";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";
import { generatePath, useNavigate } from "react-router-dom";

const CategoryTable = () => {
  const { fetchCategoriesData } = useReferenceDataActions()
  const { fetchTicketsData } = useTicketActions()
  const { fetchTaskPerformersData } = useUserManagementActions()
  const navigate = useNavigate();
  const categories = useCategoriesEntities()
  const tickets = useTicketsEntities();
  const performers = useTaskPerformersEntities();

  const categoriesStatus = useCategoriesStatus()
  const ticketsStatus = useTicketsStatus()
  const taskPerformersStatus = useTaskPerformersStatus()

  const isSuccess = categoriesStatus.isSuccess && ticketsStatus.isSuccess && taskPerformersStatus.isSuccess
  const isLoading = categoriesStatus.isLoading || ticketsStatus.isLoading || taskPerformersStatus.isLoading

  const rows = isSuccess ? getCategoryRows({
    categories,
    tickets,
    performers,
    completedStatusId: '7',
  }) : []

  const handleRowClick = (id: string | number, event: React.MouseEvent | undefined) => {
    const path = generatePath(AppRoute.TaskPerformer, { id: String(id) });

    if (event?.ctrlKey || event?.metaKey) {
      window.open(path, "_blank");
    } else {
      navigate(path);
    } 
  }

  useEffect(() => {
    if (categoriesStatus.isIdle) {
      fetchCategoriesData()
    }

    if (ticketsStatus.isIdle) {
      fetchTicketsData()
    }

    if (taskPerformersStatus.isIdle) {
      fetchTaskPerformersData()
    }
  }, [categoriesStatus.isIdle, ticketsStatus.isIdle, taskPerformersStatus.isIdle, fetchTicketsData, fetchTaskPerformersData])

  return isLoading ? <Spinner fullscreen={false} /> : (
    <DataTable
      name="Категории"
      columns={getCategoryColumns()}
      rows={rows}
      loading={isLoading}
      onClick={handleRowClick}
      disableToolBar
      disableFooter
    />
  )
}


export default CategoryTable