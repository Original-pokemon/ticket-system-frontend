import PageLayout from "../../components/layouts/PageLayout/PageLayout"
import { fetchBushData, fetchCategoriesData, fetchPetrolStationData, fetchStatusesData, fetchTicketsData, getLocationDataStatus, getPetrolStationsStatus, getReferenceDataStatus, getTicketsStatus, selectAllBushes, selectAllCategories, selectAllPetrolStations, selectAllStatuses, selectAllTickets, selectPetrolStationsEntities } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import Filter, { FilterMetaType } from "../../components/Filter/Filter";
import { SelectedFiltersType } from "../../components/Filter/types";
import { TicketTable } from "../../components/tickets/TicketTable";
import filterTickets from "../../utils/filter-tickets";
import FilterData from "./const";
import Spinner from "../../components/Spinner/Spinner";

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
  })), [categoriesData.length]);
  const ticketStatusTypeOptions = useMemo(() => statusesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [statusesData.length]);
  const busesTypeOptions = useMemo(() => bushesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [bushesData.length]);

  const filterMeta: FilterMetaType = useMemo(() => ({
    [FilterData.Category.id]: {
      title: FilterData.Category.title,
      options: categoryTypeOptions,
    },
    [FilterData.Bush.id]: {
      title: FilterData.Bush.title,
      options: busesTypeOptions,
    },
    [FilterData.Status.id]: {
      title: FilterData.Status.title,
      options: ticketStatusTypeOptions,
    }
  }), [categoryTypeOptions.length, busesTypeOptions.length, ticketStatusTypeOptions.length]);

  const handleApplyFilters = useCallback((selectedFilters: SelectedFiltersType) => {
    const { Category: { id: categoryId }, Bush: { id: bushId }, Status: { id: StatusId } } = FilterData

    if (selectedFilters[categoryId]) {
      const { options } = selectedFilters[categoryId];
      const valueList = options.map((option) => option.value);
      setCategoriesType(valueList);
    } else {
      setCategoriesType([]);
    }

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

  const filteredTickets = useMemo(() => {
    return filterTickets({ ticketsData, petrolStations: petrolStationsEntities, ticketStatusType: statusesType, bushesType, categoriesType });
  }, [
    ticketsData.length,
    statusesType.length,
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

  return isLoading ? <Spinner fullscreen={false} /> : (
    <PageLayout>
      <PageLayout.Title>Задачи</PageLayout.Title>
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

            <Filter.MultipleChoice
              id={FilterData.Bush.id}
              {...filterMeta[FilterData.Bush.id]}
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