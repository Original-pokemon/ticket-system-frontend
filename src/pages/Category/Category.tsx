import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocationDataActions, useBushes, usePetrolStationsEntities, useBushesEntities, useCategoryById, useStatuses, useReferenceDataStatus, useBushesStatus, useReferenceDataActions, useTickets, useTicketsStatus, useTicketActions, useTaskPerformers, useTaskPerformersStatus, useUserManagementActions } from "../../store";
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

const Category = () => {
  const { fetchBushes } = useLocationDataActions()
  const { fetchCategoriesData, fetchStatusesData } = useReferenceDataActions()
  const { fetchTicketsData } = useTicketActions()
  const { fetchTaskPerformersData } = useUserManagementActions()
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const ticketsData = useTickets()
  const category = useCategoryById(id)
  const petrolStationsEntities = usePetrolStationsEntities();
  const statusesData = useStatuses()
  const bushesEntities = useBushesEntities();
  const bushesData = useBushes();
  const taskPerformers = useTaskPerformers()

  const ticketsStatus = useTicketsStatus()
  const referenceDataStatus = useReferenceDataStatus()
  const taskPerformersStatus = useTaskPerformersStatus()
  const busesStatus = useBushesStatus()

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
    return taskPerformers.filter(({ id }) => id === id)
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
  }, [])

  useEffect(() => {
    if (ticketsStatus.isIdle) {
      fetchTicketsData();
    }
    if (referenceDataStatus.isIdle) {
      fetchCategoriesData()
      fetchStatusesData()
    }
    if (taskPerformersStatus.isIdle) {
      fetchTaskPerformersData();
    }
    if (busesStatus.isIdle) {
      fetchBushes()
    }

  }, [ticketsStatus.isIdle, fetchTicketsData, referenceDataStatus.isIdle, taskPerformersStatus.isIdle, busesStatus.isIdle, fetchCategoriesData, fetchStatusesData, fetchTaskPerformersData, fetchBushes]);

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
          {taskPerformersStatus.isLoading && <Spinner fullscreen={false} />}
          {taskPerformersStatus.isSuccess && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Исполнитель</TableCell>
                  <TableCell>Куст</TableCell>
                  <TableCell>Создан</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filteredTaskPerformers || []).map(({ id, bush_id, user }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <span className="text-sm">
                        {user.user_name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge>{bushesEntities[bush_id || '']?.description || 'Не указано'}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {dayjs(user.created_at).format('DD.MM.YYYY')}
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

export default Category