import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchBushData, fetchCategoriesData, fetchManagersData, fetchPetrolStationData, fetchStatusesData, fetchTaskPerformersData, fetchTicketsData, getCategoriesStatus, getLocationDataStatus, getManagersStatus, getReferenceDataStatus, getTaskPerformersStatus, getTicketsStatus, getTicketStatusesStatus, selectAllBushes, selectAllCategories, selectAllStatuses, selectAllTaskPerformers, selectAllTickets, selectBushesEntities, selectCategoriesEntities, selectCategoryById, selectManagerById, selectManagersEntities, selectPetrolStationById, selectPetrolStationsEntities, selectStatusesEntities } from "../../store";
import Spinner from "../../components/Spinner/Spinner";
import Single from "../../components/Single/Single";
import { TicketTable } from "../../components/tickets/TicketTable";
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import filterTickets from "../../utils/filter-tickets";
import PageLayout from "../../components/layouts/PageLayout/PageLayout";
import FilterData from "../TicketsList/const";
import { SelectedFiltersType } from "../../components/Filter/types";
import Filter, { FilterMetaType } from "../../components/Filter/Filter";

const PetrolStation = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const petrolStation = useAppSelector((state) => selectPetrolStationById(state, id))
  const ticketsData = petrolStation?.tickets || []
  const managersEntities = useAppSelector(selectManagersEntities);
  const statusesData = useAppSelector(selectAllStatuses);
  const bushesEntities = useAppSelector(selectBushesEntities);
  const categoriesData = useAppSelector(selectAllCategories)

  const managersStatus = useAppSelector(getManagersStatus)
  const referenceDataStatus = useAppSelector(getReferenceDataStatus)
  const ticketStatusesStatus = useAppSelector(getTicketStatusesStatus)
  const locationDataStatus = useAppSelector(getLocationDataStatus)

  const isIdle = managersStatus.isIdle && referenceDataStatus.isIdle && ticketStatusesStatus.isIdle && locationDataStatus.isIdle;
  const isLoading = managersStatus.isLoading || referenceDataStatus.isLoading || ticketStatusesStatus.isLoading || locationDataStatus.isLoading;

  //for filter
  const [statusesType, setStatusesType] = useState<string[]>([]);
  const [categoriesType, setCategoriesType] = useState<string[]>([]);

  const ticketStatusTypeOptions = useMemo(() => statusesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [statusesData.length]);

  const categoryTypeOptions = useMemo(() => categoriesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [categoriesData.length]);

  const filterMeta: FilterMetaType = useMemo(() => ({
    [FilterData.Category.id]: {
      title: FilterData.Category.title,
      options: categoryTypeOptions,
    },
    [FilterData.Status.id]: {
      title: FilterData.Status.title,
      options: ticketStatusTypeOptions,
    }
  }), [categoryTypeOptions.length, ticketStatusTypeOptions.length]);

  const filteredTickets = useMemo(() => {
    return filterTickets({ ticketsData, petrolStations: { [petrolStation?.id]: { ...petrolStation } }, ticketStatusType: statusesType, bushesType: [petrolStation?.bush_id], categoriesType });
  }, [
    ticketsData.length,
    statusesType,
  ])

  const handleApplyFilters = useCallback((selectedFilters: SelectedFiltersType) => {
    const { Category: { id: categoryId }, Status: { id: StatusId } } = FilterData

    if (selectedFilters[categoryId]) {
      const { options } = selectedFilters[categoryId];
      const valueList = options.map((option) => option.value);
      setCategoriesType(valueList);
    } else {
      setCategoriesType([]);
    }

    if (selectedFilters[StatusId]) {
      const { options } = selectedFilters[StatusId];
      const valueList = options.map((option) => option.value);
      setStatusesType(valueList);
    } else {
      setStatusesType([]);
    }
  }, [dispatch])

  useEffect(() => {
    if (managersStatus.isIdle) {
      dispatch(fetchManagersData());
    }
    if (referenceDataStatus.isIdle) {
      dispatch(fetchCategoriesData());
      dispatch(fetchStatusesData())
    }
    if (locationDataStatus.isIdle) {
      dispatch(fetchBushData())
      dispatch(fetchPetrolStationData())
    }

  }, [dispatch, managersStatus.isIdle, referenceDataStatus.isIdle, locationDataStatus.isIdle]);

  if (isIdle) {
    return <Spinner fullscreen={true} />
  }

  return isLoading ? <Spinner fullscreen={false} /> : (
    <PageLayout>
      <PageLayout.Title>{petrolStation?.user?.user_name} </PageLayout.Title>
      <PageLayout.Toolbar>
        <PageLayout.Filters>
          <Filter onChange={handleApplyFilters} filterMeta={filterMeta}>
            <Filter.MultipleChoice
              id={FilterData.Category.id}
              {...filterMeta[FilterData.Category.id]}
            />

            <Filter.MultipleChoice
              id={FilterData.Status.id}
              {...filterMeta[FilterData.Status.id]}
            />
          </Filter>
        </PageLayout.Filters>
      </PageLayout.Toolbar>
      <Single>
        <Single.MainContent>
          <TicketTable name="tickets_per_category" tickets={filteredTickets} isLoading={managersStatus.isLoading} />
        </Single.MainContent>

        <Single.SidePanel title="Прикрепленные менеджеры">
          <TableContainer>
            {managersStatus.isLoading && <Spinner fullscreen={false} />}
            {managersStatus.isSuccess && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Мененджер</TableCell>
                    <TableCell>Куст</TableCell>
                    <TableCell>Создан</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(petrolStation?.managers || []).map(({ id, user, bush_id, }) => (
                    <TableRow key={id}>
                      <TableCell>
                        <Typography variant="body2">
                          {managersEntities[id]?.user?.user_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={bushesEntities[bush_id || ''].description || 'Не указано'} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {dayjs(user?.created_at).format('DD.MM.YYYY')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Single.SidePanel>
      </Single>
    </PageLayout>
  )
}

export default PetrolStation