import { useEffect } from "react";
import { Status } from "../../../const";
import { useAppDispatch, useAppSelector } from "../../../hooks/state";
import { fetchCategoriesData, fetchTaskPerformersData, fetchTicketsData, getCategoriesStatus, getTaskPerformersStatus, getTicketsStatus, selectCategoriesEntities, selectPetrolStationsEntities, selectTaskPerformersEntities, selectTicketsEntities } from "../../../store";
import getCategoryRows from "./get-category-rows";
import { useRedirect } from "react-admin";
import getCategoryColumns from "./get-category-columns";
import Spinner from "../../Spinner/Spinner";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";

const CategoryTable = () => {
  const redirect = useRedirect();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategoriesEntities);
  const tickets = useAppSelector(selectTicketsEntities);
  const performers = useAppSelector(selectTaskPerformersEntities);

  const categoriesStatus = useAppSelector(getCategoriesStatus)
  const ticketsStatus = useAppSelector(getTicketsStatus)
  const taskPerformersStatus = useAppSelector(getTaskPerformersStatus)

  const isSuccess = categoriesStatus.isSuccess && ticketsStatus.isSuccess && taskPerformersStatus.isSuccess
  const isLoading = categoriesStatus.isLoading || ticketsStatus.isLoading || taskPerformersStatus.isLoading

  const rows = isSuccess ? getCategoryRows({
    categories,
    tickets,
    performers,
    completedStatusId: '7',
  }) : []

  const handleRowClick = (id: string | number) => {
    // const path = generatePath(AppRoute.Ticket, { id: String(id) });
    redirect('show', 'category', id);
  }

  useEffect(() => {
    if (categoriesStatus.isIdle) {
      dispatch(fetchCategoriesData())
    }

    if (ticketsStatus.isIdle) {
      dispatch(fetchTicketsData())
    }

    if (taskPerformersStatus.isIdle) {
      dispatch(fetchTaskPerformersData())
    }
  }, [dispatch, categoriesStatus.isIdle])

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