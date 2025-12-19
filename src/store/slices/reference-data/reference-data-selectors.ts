import { useReferenceDataStore } from './reference-data-store';
import { Status } from '../../../const';
import { StatusType } from '../../../types';

export const useCategories = () => {
  const { ids, entities } = useReferenceDataStore.use.categories();
  return ids.map((id) => entities[id]);
};

export const useCategoriesEntities = () => useReferenceDataStore.use.categories().entities;

export const useCategoryById = (id: string) => {
  const entities = useReferenceDataStore.use.categories().entities;
  return entities[id];
};

export const useStatuses = () => {
  const { ids, entities } = useReferenceDataStore.use.statuses();
  return ids.map((id) => entities[id]);
};

export const useStatusesEntities = () => useReferenceDataStore.use.statuses().entities;

export const useStatusById = (id: string) => {
  const entities = useReferenceDataStore.use.statuses().entities;
  return entities[id];
};

export const useCategoriesStatus = () => {
  const status = useReferenceDataStore.use.categories().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useStatusesStatus = () => {
  const status = useReferenceDataStore.use.statuses().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useReferenceDataStatus = () => {
  const categoriesStatus = useReferenceDataStore.use.categories().status;
  const statusesStatus = useReferenceDataStore.use.statuses().status;
  const statuses = [categoriesStatus, statusesStatus];

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

export const useReferenceDataActions = () => ({
  fetchCategoriesData: useReferenceDataStore.use.fetchCategoriesData(),
  fetchStatusesData: useReferenceDataStore.use.fetchStatusesData(),
});
