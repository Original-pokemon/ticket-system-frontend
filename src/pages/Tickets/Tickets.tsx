import { Box, useMediaQuery } from "@mui/material"
import PageLayout from "../../components/layouts/PageLayout/PageLayout"
import { TicketTable } from "../../tickets/TicketTable/TicketTable";
import { fetchBushData, fetchCategoriesData, fetchPetrolStationData, fetchStatusesData, fetchTicketsData, getLocationDataStatus, getPetrolStationsStatus, getReferenceDataStatus, getTicketsStatus, selectAllBushes, selectAllCategories, selectAllPetrolStations, selectAllStatuses, selectAllTickets } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { useCallback, useEffect, useMemo, useState } from "react";
import Filter from "../../components/Filter/Filter";
import { FilterId } from "./const";
import { SelectedFiltersType } from "../../components/Filter/types";
import { PetrolStationType, TicketType } from "../../types";
import petrolStation from "../../petrol-station";

const filterTickets = (
  tickets: TicketType[],
  petrolStations: PetrolStationType[],
  ticketStatusType: string[],
  bushType: string[],
  categoryType: string[],
): TicketType[] => {
  return tickets.filter((ticket) => {
    let ticketStatusTypeMatch = true
    if (ticketStatusType.length > 0) {
      ticketStatusTypeMatch = ticketStatusType.includes(String(ticket.status_id));
    }

    let bushTypeMatch = true
    if (bushType.length > 0) {
      const petrolStation = petrolStations.find((a) => a.id === ticket.petrol_station_id)
      if (petrolStation) {
        bushTypeMatch = bushType.includes(String(petrolStation.bush_id));
      }
    }

    let categoryTypeMatch = true
    if (categoryType.length > 0) {
      categoryTypeMatch = categoryType.includes(String(ticket.ticket_category));
    }

    return categoryTypeMatch && bushTypeMatch && ticketStatusTypeMatch;
  });
};

const Tickets = () => {
  const dispatch = useAppDispatch();
  const ticketsData = useAppSelector(selectAllTickets)
  const categoriesData = useAppSelector(selectAllCategories)
  const statusesData = useAppSelector(selectAllStatuses)
  const bushesData = useAppSelector(selectAllBushes)
  const petrolStationsData = useAppSelector(selectAllPetrolStations)
  const { isIdle: isTicketsStatusIdle, isLoading } = useAppSelector(getTicketsStatus)
  const { isIdle } = useAppSelector(getReferenceDataStatus)
  const { isIdle: isLocationDataStatusIdle } = useAppSelector(getLocationDataStatus)

  const [categoriesType, setCategoriesType] = useState<string[]>([]);
  const [statusesType, setStatusesType] = useState<string[]>([]);
  const [busesType, setBusesType] = useState<string[]>([]);
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
      setBusesType(valueList);
    } else {
      setBusesType([]);
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
    return filterTickets(ticketsData, petrolStationsData, statusesType, busesType, categoriesType);
  }, [
    ticketsData,
    statusesType,
    busesType,
    categoriesType,
  ])

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchStatusesData())
      dispatch(fetchCategoriesData())
    }
    if (isLocationDataStatusIdle) {
      dispatch(fetchPetrolStationData())
      dispatch(fetchBushData())
    }
    if (isTicketsStatusIdle) {
      dispatch(fetchTicketsData())
    }
  }, [isIdle, dispatch])

  return (
    <PageLayout>
      <PageLayout.Title>Задачи</PageLayout.Title>
      <PageLayout.Toolbar>
        <PageLayout.Filters>
          {/* <DateRangePicker
            key={1}
            initialStartDate={startDate}
            initialEndDate={endDate}
            onDateChange={handleDateChange}
          /> */}

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

export default Tickets