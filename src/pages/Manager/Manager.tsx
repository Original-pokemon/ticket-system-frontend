import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePetrolStationsEntities, useBushesEntities, useLocationDataStatus, useLocationDataActions, useBushes, useStatuses, useCategories, useReferenceDataStatus, useReferenceDataActions, useManagerById, useManagersStatus, useUserManagementActions } from "../../store";
import Spinner from "../../components/Spinner/Spinner";
import Single from "../../components/Single/Single";
import { TicketTable } from "../../components/tickets/TicketTable";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import filterTickets from "../../utils/filter-tickets";
import PageLayout from "../../components/layouts/PageLayout/PageLayout";
import FilterData from "../TicketsList/const";
import { SelectedFiltersType } from "../../components/Filter/types";
import Filter, { FilterMetaType } from "../../components/Filter/Filter";

const Manager = () => {
  const { fetchPetrolStations, fetchBushes } = useLocationDataActions();
  const { fetchCategoriesData, fetchStatusesData } = useReferenceDataActions()
  const { fetchManagersData } = useUserManagementActions()
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const manager = useManagerById(id)
  const ticketsData = manager?.petrol_stations?.flatMap(petrolStation => petrolStation.tickets) || []
  const petrolStationsEntities = usePetrolStationsEntities();
  const statusesData = useStatuses()
  const bushesEntities = useBushesEntities();
  const bushesData = useBushes()
  const categoriesData = useCategories()

  const managersStatus = useManagersStatus()
  const referenceDataStatus = useReferenceDataStatus()
  const locationDataStatus = useLocationDataStatus()

  const isIdle = managersStatus.isIdle && referenceDataStatus.isIdle
  const isLoading = managersStatus.isLoading || referenceDataStatus.isLoading 

  //for filter
  const [statusesType, setStatusesType] = useState<string[]>([]);
  const [bushesType, setBushesType] = useState<string[]>([]);
  const [categoriesType, setCategoriesType] = useState<string[]>([]);

  const ticketStatusTypeOptions = useMemo(() => statusesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [statusesData.length]);

  const busesTypeOptions = useMemo(() => bushesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [bushesData.length]);

  const categoryTypeOptions = useMemo(() => categoriesData.map(({ id, description }) => ({
    label: description,
    value: String(id),
  })), [categoriesData.length]);

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

  const filteredTickets = useMemo(() => {
    return filterTickets({ ticketsData, petrolStations: petrolStationsEntities, ticketStatusType: statusesType, bushesType, categoriesType });
  }, [
    ticketsData.length,
    statusesType,
    bushesType,
    petrolStationsEntities,
  ])

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
  }, [])

  useEffect(() => {
    if (managersStatus.isIdle) {
      fetchManagersData();
    }
    if (referenceDataStatus.isIdle) {
      fetchCategoriesData()
      fetchStatusesData()
    }
    if (locationDataStatus.isIdle) {
      fetchBushes();
      fetchPetrolStations();
    }

  }, [managersStatus.isIdle, referenceDataStatus.isIdle, locationDataStatus.isIdle, fetchManagersData, fetchCategoriesData, fetchStatusesData, fetchBushes, fetchPetrolStations]);

  if (isIdle) {
    return <Spinner fullscreen={true} />
  }

  return isLoading ? <Spinner fullscreen={false} /> : (
    <PageLayout>
      <PageLayout.Title>{manager?.user?.user_name} </PageLayout.Title>
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
      <Single>
        <Single.MainContent>
          <TicketTable name="tickets_per_category" tickets={filteredTickets} isLoading={managersStatus.isLoading} />
        </Single.MainContent>

        <Single.SidePanel title="Прикрепленные АЗС">
          {locationDataStatus.isLoading && <Spinner fullscreen={false} />}
          {locationDataStatus.isSuccess && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>АЗС</TableCell>
                  <TableCell>Куст</TableCell>
                  <TableCell>Создан</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(manager?.petrol_stations || []).map(({ id, user, bush_id, }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <span className="text-sm">
                        {petrolStationsEntities[id]?.user?.user_name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge>{bushesEntities[bush_id || ''].description || 'Не указано'}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {dayjs(user?.created_at).format('DD.MM.YYYY')}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Single.SidePanel>
      </Single>
    </PageLayout>
  )
}

export default Manager