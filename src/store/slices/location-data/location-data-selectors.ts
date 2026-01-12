import { useLocationDataStore } from './location-data-store';
import { Status } from '../../../const';
import { StatusType } from '../../../types';

export const usePetrolStations = () => {
  const data = useLocationDataStore.use.petrolStations();
  if (!data) return [];
  const { ids, entities } = data;
  return ids.map((id) => entities[id]);
};

export const usePetrolStationsEntities = () => useLocationDataStore.use.petrolStations().entities;

export const usePetrolStationById = (id: string) => {
  const entities = useLocationDataStore.use.petrolStations().entities;
  return entities[id];
};

export const usePetrolStationsStatus = () => {
  const data = useLocationDataStore.use.petrolStations();
  const status = data.status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useBushes = () => {
  const data = useLocationDataStore.use.bushes();
  if (!data) return [];
  const { ids, entities } = data;
  return ids.map((id) => entities[id]);
};

export const useBushesEntities = () => useLocationDataStore.use.bushes().entities;

export const useBushesStatus = () => {
  const data = useLocationDataStore.use.bushes();
  const status = data?.status || Status.Idle;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useLocationDataStatus = () => {
  const petrolStationsData = useLocationDataStore.use.petrolStations();
  const bushesData = useLocationDataStore.use.bushes();
  const petrolStationsStatus = petrolStationsData?.status || Status.Idle;
  const bushesStatus = bushesData?.status || Status.Idle;
  const statuses = [petrolStationsStatus, bushesStatus];

  let status: StatusType = Status.Idle;

  if (statuses.every((s) => s === Status.Success)) {
    status = Status.Success;
  }

  if (statuses.includes(Status.Loading)) {
    status = Status.Loading;
  }

  if (statuses.includes(Status.Error)) {
    status = Status.Error;
  }

  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useLocationDataActions = () => ({
  fetchPetrolStations: useLocationDataStore.use.fetchPetrolStations(),
  fetchBushes: useLocationDataStore.use.fetchBushes(),
});