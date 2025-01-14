import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchBushData, fetchCategoriesData, fetchStatusesData, fetchTaskPerformersData, fetchTicketsData, getCategoriesStatus, getReferenceDataStatus, getTaskPerformersStatus, getTicketsStatus, getTicketStatusesStatus, selectAllBushes, selectAllStatuses, selectAllTaskPerformers, selectAllTickets, selectBushesEntities, selectCategoriesEntities, selectCategoryById, selectPetrolStationsEntities, selectStatusesEntities } from "../../store";
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

const Category = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const ticketsData = useAppSelector(selectAllTickets)
  const category = useAppSelector((state) => selectCategoryById(state, id))
  const petrolStationsEntities = useAppSelector(selectPetrolStationsEntities);
  const statusesData = useAppSelector(selectAllStatuses);
  const bushesEntities = useAppSelector(selectBushesEntities);
  const bushesData = useAppSelector(selectAllBushes);
  const taskPerformers = useAppSelector(selectAllTaskPerformers)

  const ticketsStatus = useAppSelector(getTicketsStatus)
  const referenceDataStatus = useAppSelector(getReferenceDataStatus)
  const taskPerformersStatus = useAppSelector(getTaskPerformersStatus)
  const busesStatus = useAppSelector(getTicketStatusesStatus)

  const isIdle = ticketsStatus.isIdle && referenceDataStatus.isIdle && taskPerformersStatus.isIdle && busesStatus.isIdle;
  const isLoading = ticketsStatus.isLoading || referenceDataStatus.isLoading || taskPerformersStatus.isLoading || busesStatus.isLoading;

  //for filter
  const [statusesType, setStatusesType] = useState<string[]>([]);
  const [bushesType, setBushesType] = useState<string[]>([]);

  const ticketStatusTypeOptions = useMemo(() => statusesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [statusesData.length]);

  const busesTypeOptions = useMemo(() => bushesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [bushesData.length]);


  const filterMeta: FilterMetaType = useMemo(() => ({
    [FilterData.Bush.id]: {
      title: FilterData.Bush.title,
      options: busesTypeOptions,
    },
    [FilterData.Status.id]: {
      title: FilterData.Status.title,
      options: ticketStatusTypeOptions,
    }
  }), [busesTypeOptions, ticketStatusTypeOptions]);

  const filteredTickets = useMemo(() => {
    return filterTickets({ ticketsData, petrolStations: petrolStationsEntities, ticketStatusType: statusesType, bushesType, categoriesType: [id] });
  }, [
    ticketsData.length,
    statusesType,
    bushesType,
    petrolStationsEntities,
  ])

  const filteredTaskPerformers = useMemo(() => {
    return taskPerformers.filter(({ category_id }) => category_id === id)
  }, [taskPerformers.length, id])

  const handleApplyFilters = useCallback((selectedFilters: SelectedFiltersType) => {
    const { Bush: { id: bushId }, Status: { id: StatusId } } = FilterData

    if (selectedFilters[bushId]) {
      const { options } = selectedFilters[bushId];
      const valueList = options.map((option) => option.value);
      setBushesType(valueList);
    } else {
      setBushesType([]);
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
    if (ticketsStatus.isIdle) {
      dispatch(fetchTicketsData());
    }
    if (referenceDataStatus.isIdle) {
      dispatch(fetchCategoriesData());
      dispatch(fetchStatusesData())
    }
    if (taskPerformersStatus.isIdle) {
      dispatch(fetchTaskPerformersData());
    }
    if (busesStatus.isIdle) {
      dispatch(fetchBushData())
    }

  }, [dispatch]);

  if (isIdle) {
    return <Spinner fullscreen={true} />
  }

  return isLoading ? <Spinner fullscreen={false} /> : (
    <PageLayout>
      <PageLayout.Title>{category?.description} </PageLayout.Title>
      <PageLayout.Toolbar>
        <PageLayout.Filters>
          <Filter onChange={handleApplyFilters} filterMeta={filterMeta}>
            <Filter.MultipleChoice
              id={FilterData.Status.id}
              {...filterMeta[FilterData.Status.id]}
            />

            <Filter.MultipleChoice
              id={FilterData.Bush.id}
              {...filterMeta[FilterData.Bush.id]}
            />

          </Filter>
        </PageLayout.Filters>
      </PageLayout.Toolbar>
      <Single>
        <Single.MainContent>
          <TicketTable name="tickets_per_category" tickets={filteredTickets} isLoading={ticketsStatus.isLoading} />
        </Single.MainContent>

        <Single.SidePanel title="Исполнители для категории">
          <TableContainer>
            {taskPerformersStatus.isLoading && <Spinner fullscreen={false} />}
            {taskPerformersStatus.isSuccess && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Исполнитель</TableCell>
                    <TableCell>Куст</TableCell>
                    <TableCell>Создан</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(filteredTaskPerformers || []).map(({ id, bush_id, user }) => (
                    <TableRow key={id}>
                      <TableCell>
                        <Typography variant="body2">
                          {user.user_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={bushesEntities[bush_id || '']?.description || 'Не указано'} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {dayjs(user.created_at).format('DD.MM.YYYY')}
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

export default Category