import { useEffect } from "react";
import { AppRoute, Status } from "../../../const";
import { useAppDispatch, useAppSelector } from "../../../hooks/state";
import { fetchCategoriesData, fetchTaskPerformersData, fetchTicketsData, getCategoriesStatus, getTaskPerformersStatus, getTicketsStatus, selectCategoriesEntities, selectPetrolStationsEntities, selectTaskPerformersEntities, selectTicketsEntities } from "../../../store";
import getCategoryRows from "./get-category-rows";
import getCategoryColumns from "./get-category-columns";
import Spinner from "../../Spinner/Spinner";
import DataTable from "../../layouts/data-layouts/DataTable/DataTable";
import { generatePath, useNavigate } from "react-router-dom";

const CategoryTable = () => {
  const navigate = useNavigate();
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