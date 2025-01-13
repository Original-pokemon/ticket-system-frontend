import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchBushData, fetchCategoriesData, fetchManagersData, fetchPetrolStationData, fetchStatusesData, fetchTaskPerformersData, fetchTicketsData, getCategoriesStatus, getLocationDataStatus, getManagersStatus, getReferenceDataStatus, getTaskPerformersStatus, getTicketsStatus, getTicketStatusesStatus, selectAllBushes, selectAllCategories, selectAllStatuses, selectAllTaskPerformers, selectAllTickets, selectBushesEntities, selectCategoriesEntities, selectCategoryById, selectManagerById, selectPetrolStationsEntities, selectStatusesEntities } from "../../store";
import Spinner from "../../components/Spinner/Spinner";
import Single from "../../components/Single/Single";
import { TicketTable } from "../../components/tickets/TicketTable";
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import filterTickets from "../../utils/filter-tickets";
import PageLayout from "../../components/layouts/PageLayout/PageLayout";
import { FilterId } from "../TicketsList/const";
import { SelectedFiltersType } from "../../components/Filter/types";
import Filter from "../../components/Filter/Filter";

const Manager = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const manager = useAppSelector((state) => selectManagerById(state, id))
  const ticketsData = manager?.petrol_stations?.flatMap(petrolStation => petrolStation.tickets) || []
  const petrolStationsEntities = useAppSelector(selectPetrolStationsEntities);
  const statusesData = useAppSelector(selectAllStatuses);
  const bushesEntities = useAppSelector(selectBushesEntities);
  const bushesData = useAppSelector(selectAllBushes);
  const categoriesData = useAppSelector(selectAllCategories)

  const managersStatus = useAppSelector(getManagersStatus)
  const referenceDataStatus = useAppSelector(getReferenceDataStatus)
  const ticketStatusesStatus = useAppSelector(getTicketStatusesStatus)
  const locationDataStatus = useAppSelector(getLocationDataStatus)

  const isIdle = managersStatus.isIdle && referenceDataStatus.isIdle && ticketStatusesStatus.isIdle;

  //for filter
  const [statusesType, setStatusesType] = useState<string[]>([]);
  const [bushesType, setBushesType] = useState<string[]>([]);
  const [categoriesType, setCategoriesType] = useState<string[]>([]);

  const ticketStatusTypeOptions = useMemo(() => statusesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [statusesData]);

  const busesTypeOptions = useMemo(() => bushesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [bushesData]);

  const categoryTypeOptions = useMemo(() => categoriesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [categoriesData]);

  const filteredTickets = useMemo(() => {
    return filterTickets({ ticketsData, petrolStations: petrolStationsEntities, ticketStatusType: statusesType, bushesType, categoriesType });
  }, [
    ticketsData,
    statusesType,
    bushesType,
    petrolStationsEntities,
  ])

  const handleApplyFilters = useCallback((selectedFilters: SelectedFiltersType) => {
    if (selectedFilters[FilterId.CATEGORY]) {
      const { options } = selectedFilters[FilterId.CATEGORY];
      const valueList = options.map((option) => option.value);
      setCategoriesType(valueList);
    } else {
      setCategoriesType([]);
    }

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

  }, [dispatch]);

  if (isIdle) {
    return <Spinner fullscreen={true} />
  }

  return (
    <PageLayout>
      <PageLayout.Title>{manager?.user?.user_name} </PageLayout.Title>
      <PageLayout.Toolbar>
        <PageLayout.Filters>
          <Filter onChange={handleApplyFilters}>
            <Filter.MultipleChoice
              id={FilterId.CATEGORY}
              title="Категории"
              options={categoryTypeOptions}
            />

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
          <TicketTable name="tickets_per_category" tickets={filteredTickets} isLoading={managersStatus.isLoading} />
        </Single.MainContent>

        <Single.SidePanel title="Исполнители для категории">
          <TableContainer>
            {locationDataStatus.isLoading && <Spinner fullscreen={false} />}
            {locationDataStatus.isSuccess && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>АЗС</TableCell>
                    <TableCell>Куст</TableCell>
                    <TableCell>Создан</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(manager?.petrol_stations || []).map(({ id, user, bush_id, }) => (
                    <TableRow key={id}>
                      <TableCell>
                        <Typography variant="body2">
                          {petrolStationsEntities[id]?.user?.user_name}
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

export default Manager