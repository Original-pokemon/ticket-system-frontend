import PageLayout from "../../components/layouts/PageLayout/PageLayout"
import { fetchBushData, fetchCategoriesData, fetchPetrolStationData, fetchStatusesData, fetchTicketsData, getLocationDataStatus, getPetrolStationsStatus, getReferenceDataStatus, getTicketsStatus, selectAllBushes, selectAllCategories, selectAllPetrolStations, selectAllStatuses, selectAllTickets, selectPetrolStationsEntities } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import Filter from "../../components/Filter/Filter";
import { FilterId } from "./const";
import { SelectedFiltersType } from "../../components/Filter/types";
import { PetrolStationType, TicketType } from "../../types";
import { TicketTable } from "../../components/tickets/TicketTable";
import filterTickets from "../../utils/filter-tickets";

const TicketsList = () => {
  const dispatch = useAppDispatch();
  const ticketsData = useAppSelector(selectAllTickets)
  const categoriesData = useAppSelector(selectAllCategories)
  const statusesData = useAppSelector(selectAllStatuses)
  const bushesData = useAppSelector(selectAllBushes)
  const petrolStationsEntities = useAppSelector(selectPetrolStationsEntities)

  const ticketsStatus = useAppSelector(getTicketsStatus)
  const referenceDataStatus = useAppSelector(getReferenceDataStatus)
  const locationDataStatus = useAppSelector(getLocationDataStatus)
  const isLoading = ticketsStatus.isLoading || referenceDataStatus.isLoading || locationDataStatus.isLoading

  const [categoriesType, setCategoriesType] = useState<string[]>([]);
  const [statusesType, setStatusesType] = useState<string[]>([]);
  const [bushesType, setBushesType] = useState<string[]>([]);
  // const tableName = `tickets-${startDate.format('YYYY-MM-DD')}-${endDate.format('YYYY-MM-DD')}`;

  const categoryTypeOptions = useMemo(() => categoriesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [categoriesData]);
  const ticketStatusTypeOptions = useMemo(() => statusesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [statusesData]);
  const busesTypeOptions = useMemo(() => bushesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [bushesData]);

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

  const filteredTickets = useMemo(() => {
    return filterTickets({ ticketsData, petrolStations: petrolStationsEntities, ticketStatusType: statusesType, bushesType, categoriesType });
  }, [
    ticketsData,
    statusesType,
    bushesType,
    petrolStationsEntities,
    categoriesType,
  ])

  useEffect(() => {
    if (referenceDataStatus.isIdle) {
      dispatch(fetchStatusesData())
      dispatch(fetchCategoriesData())
    }
    if (locationDataStatus.isIdle) {
      dispatch(fetchPetrolStationData())
      dispatch(fetchBushData())
    }
    if (ticketsStatus.isIdle) {
      dispatch(fetchTicketsData())
    }
  }, [referenceDataStatus.isIdle, ticketsStatus.isIdle, locationDataStatus.isIdle, dispatch])

  return (
    <PageLayout>
      <PageLayout.Title>Задачи</PageLayout.Title>
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

      <PageLayout.Content>
        <TicketTable
          name={'tickets'}
          tickets={filteredTickets}
          isLoading={isLoading}
        />
      </PageLayout.Content>
    </PageLayout>
  )
}

export default TicketsList