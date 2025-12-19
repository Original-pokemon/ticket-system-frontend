import { useLocationDataStore } from './location-data-store';
import { Status } from '../../../const';
import { StatusType } from '../../../types';

export const usePetrolStations = () => {
  const { ids, entities } = useLocationDataStore.use.petrolStations();
  return ids.map((id) => entities[id]);
};

export const usePetrolStationsEntities = () => useLocationDataStore.use.petrolStations().entities;

export const usePetrolStationById = (id: string) => {
  const entities = useLocationDataStore.use.petrolStations().entities;
  return entities[id];
};

export const usePetrolStationsStatus = () => {
  const status = useLocationDataStore.use.petrolStations().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useBushes = () => {
  const { ids, entities } = useLocationDataStore.use.bushes();
  return ids.map((id) => entities[id]);
};

export const useBushesEntities = () => useLocationDataStore.use.bushes().entities;

export const useBushesStatus = () => {
  const status = useLocationDataStore.use.bushes().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useLocationDataStatus = () => {
  const petrolStationsStatus = useLocationDataStore.use.petrolStations().status;
  const bushesStatus = useLocationDataStore.use.bushes().status;
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