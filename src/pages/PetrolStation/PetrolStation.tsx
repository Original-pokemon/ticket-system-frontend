import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useBushesEntities, useCategories, useLocationDataActions, useLocationDataStatus, usePetrolStationById, useReferenceDataActions, useReferenceDataStatus, useStatuses, useStatusesStatus, useManagersEntities, useManagersStatus, useUserManagementActions } from "../../store";
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
  const { fetchBushes, fetchPetrolStations } = useLocationDataActions()
  const { fetchCategoriesData, fetchStatusesData } = useReferenceDataActions()
  const { fetchManagersData } = useUserManagementActions()
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const petrolStation = usePetrolStationById(id)
  const ticketsData = petrolStation?.tickets || []
  const managersEntities = useManagersEntities();
  const statusesData = useStatuses();
  const bushesEntities = useBushesEntities()
  const categoriesData = useCategories()

  const managersStatus = useManagersStatus()
  const referenceDataStatus = useReferenceDataStatus()
  const ticketStatusesStatus = useStatusesStatus()
  const locationDataStatus = useLocationDataStatus()

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
      fetchBushes()
      fetchPetrolStations()
    }

  }, [managersStatus.isIdle, referenceDataStatus.isIdle, locationDataStatus.isIdle, fetchManagersData, fetchCategoriesData, fetchStatusesData, fetchBushes, fetchPetrolStations]);

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