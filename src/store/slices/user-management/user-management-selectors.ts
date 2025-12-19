import { useUserManagementStore } from './user-management-store';
import { Status } from '../../../const';
import { StatusType } from '../../../types';

export const useUsers = () => {
  const { ids, entities } = useUserManagementStore.use.users();
  return ids.map((id) => entities[id]);
};

export const useUsersEntities = () => useUserManagementStore.use.users().entities;

export const useUserById = (id: string) => {
  const entities = useUserManagementStore.use.users().entities;
  return entities[id];
};

export const useManagers = () => {
  const { ids, entities } = useUserManagementStore.use.managers();
  return ids.map((id) => entities[id]);
};

export const useManagersEntities = () => useUserManagementStore.use.managers().entities;

export const useManagerById = (id: string) => {
  const entities = useUserManagementStore.use.managers().entities;
  return entities[id];
};

export const useTaskPerformers = () => {
  const { ids, entities } = useUserManagementStore.use.taskPerformers();
  return ids.map((id) => entities[id]);
};

export const useTaskPerformersEntities = () => useUserManagementStore.use.taskPerformers().entities;

export const useTaskPerformerById = (id: string) => {
  const entities = useUserManagementStore.use.taskPerformers().entities;
  return entities[id];
};

export const useUsersStatus = () => {
  const status = useUserManagementStore.use.users().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useManagersStatus = () => {
  const status = useUserManagementStore.use.managers().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useTaskPerformersStatus = () => {
  const status = useUserManagementStore.use.taskPerformers().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useUserManagementActions = () => ({
  fetchUsersData: useUserManagementStore.use.fetchUsersData(),
  fetchUniqUserData: useUserManagementStore.use.fetchUniqUserData(),
  fetchManagersData: useUserManagementStore.use.fetchManagersData(),
  fetchUniqManagerData: useUserManagementStore.use.fetchUniqManagerData(),
  fetchTaskPerformersData: useUserManagementStore.use.fetchTaskPerformersData(),
  fetchUniqTaskPerformerData: useUserManagementStore.use.fetchUniqTaskPerformerData(),
});