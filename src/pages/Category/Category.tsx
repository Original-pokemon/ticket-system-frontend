import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchBushData, fetchCategoriesData, fetchStatusesData, fetchTaskPerformersData, fetchTicketsData, getCategoriesStatus, getReferenceDataStatus, getTaskPerformersStatus, getTicketsStatus, getTicketStatusesStatus, selectAllBushes, selectAllStatuses, selectAllTaskPerformers, selectAllTickets, selectBushesEntities, selectCategoriesEntities, selectCategoryById, selectPetrolStationsEntities, selectStatusesEntities } from "../../store";
import Spinner from "../../components/Spinner/Spinner";
import Single from "../../components/Single/Single";
import { TicketTable } from "../../components/tickets/TicketTable";
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import { PetrolStationType, TicketType } from "../../types";
import filterTickets from "../../utils/filter-tickets";
import PageLayout from "../../components/layouts/PageLayout/PageLayout";
import { FilterId } from "../TicketsList/const";
import { SelectedFiltersType } from "../../components/Filter/types";
import Filter from "../../components/Filter/Filter";

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

  //for filter
  const [statusesType, setStatusesType] = useState<string[]>([]);
  const [bushesType, setBushesType] = useState<string[]>([]);

  const ticketStatusTypeOptions = useMemo(() => statusesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [statusesData]);

  const busesTypeOptions = useMemo(() => bushesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [bushesData]);

  const filteredTickets = useMemo(() => {
    return filterTickets({ ticketsData, petrolStations: petrolStationsEntities, ticketStatusType: statusesType, bushesType, categoriesType: [id] });
  }, [
    ticketsData,
    statusesType,
    bushesType,
    petrolStationsEntities,
  ])

  const filteredTaskPerformers = useMemo(() => {
    return taskPerformers.filter(({ category_id }) => category_id === id)
  }, [taskPerformers, id])

  const handleApplyFilters = useCallback((selectedFilters: SelectedFiltersType) => {

    if (selectedFilters[FilterId.BUSH]) {
      const { options } = selectedFilters[FilterId.BUSH];
      const valueList = options.map((option) => option.value);
      setBushesType(valueList);
    } else {
      setBushesType([]);
    }

    if (selectedFilters[FilterId.STATUS]) {
      const { options } = selectedFilters[FilterId.STATUS];
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

  return (
    <PageLayout>
      <PageLayout.Title>{category?.description} </PageLayout.Title>
      <PageLayout.Toolbar>
        <PageLayout.Filters>
          <Filter onChange={handleApplyFilters}>

            <Filter.MultipleChoice
              id={FilterId.STATUS}
              title="Статусы"
              options={ticketStatusTypeOptions}
            />

            <Filter.MultipleChoice
              id={FilterId.BUSH}
              title="Кусты"
              options={busesTypeOptions}
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