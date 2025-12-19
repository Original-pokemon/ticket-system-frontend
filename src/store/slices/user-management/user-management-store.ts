import { create } from 'zustand';
import createAPI from '../../../services/api/api';
import { ManagerType, UserType, StatusType } from '../../../types';
import { TaskPerformerType } from '../../../types/task-performer';
import { Status } from '../../../const';
import { APIRoute } from '../../../const';
import { createSelectors } from '../../create-selectors';

const api = createAPI();

interface State {
  users: {
    entities: Record<string, UserType>;
    ids: string[];
    status: StatusType;
  };
  managers: {
    entities: Record<string, ManagerType>;
    ids: string[];
    status: StatusType;
  };
  taskPerformers: {
    entities: Record<string, TaskPerformerType>;
    ids: string[];
    status: StatusType;
  };
}

interface Actions {
  setUsers: (data: UserType[], upsert?: boolean) => void;
  setUsersStatus: (status: StatusType) => void;
  setManagers: (data: ManagerType[], upsert?: boolean) => void;
  setManagersStatus: (status: StatusType) => void;
  setTaskPerformers: (data: TaskPerformerType[], upsert?: boolean) => void;
  setTaskPerformersStatus: (status: StatusType) => void;
  fetchUsersData: () => Promise<void>;
  fetchUniqUserData: (userId: string) => Promise<void>;
  fetchManagersData: () => Promise<void>;
  fetchUniqManagerData: (managerId: string) => Promise<void>;
  fetchTaskPerformersData: () => Promise<void>;
  fetchUniqTaskPerformerData: (taskPerformerId: string) => Promise<void>;
}

const userManagementStore = create<State & Actions>((set, get) => ({
  users: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  managers: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  taskPerformers: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  setUsers: (data, upsert = false) =>
    set((state) => {
      const newEntities = { ...state.users.entities };
      const newIds = upsert ? [...state.users.ids] : [];
      data.forEach((item) => {
        newEntities[item.id] = item;
        if (!newIds.includes(item.id)) {
          newIds.push(item.id);
        }
      });
      return {
        users: {
          ...state.users,
          entities: newEntities,
          ids: newIds,
        },
      };
    }),
  setUsersStatus: (status) =>
    set((state) => ({
      users: {
        ...state.users,
        status,
      },
    })),
  setManagers: (data, upsert = false) =>
    set((state) => {
      const newEntities = { ...state.managers.entities };
      const newIds = upsert ? [...state.managers.ids] : [];
      data.forEach((item) => {
        newEntities[item.id] = item;
        if (!newIds.includes(item.id)) {
          newIds.push(item.id);
        }
      });
      return {
        managers: {
          ...state.managers,
          entities: newEntities,
          ids: newIds,
        },
      };
    }),
  setManagersStatus: (status) =>
    set((state) => ({
      managers: {
        ...state.managers,
        status,
      },
    })),
  setTaskPerformers: (data, upsert = false) =>
    set((state) => {
      const newEntities = { ...state.taskPerformers.entities };
      const newIds = upsert ? [...state.taskPerformers.ids] : [];
      data.forEach((item) => {
        newEntities[item.id] = item;
        if (!newIds.includes(item.id)) {
          newIds.push(item.id);
        }
      });
      return {
        taskPerformers: {
          ...state.taskPerformers,
          entities: newEntities,
          ids: newIds,
        },
      };
    }),
  setTaskPerformersStatus: (status) =>
    set((state) => ({
      taskPerformers: {
        ...state.taskPerformers,
        status,
      },
    })),
  fetchUsersData: async () => {
    const { setUsersStatus, setUsers } = get();
    setUsersStatus(Status.Loading);
    try {
      const { data } = await api.get<UserType[]>(APIRoute.USERS);
      setUsers(data);
      setUsersStatus(Status.Success);
    } catch (error) {
      setUsersStatus(Status.Error);
      throw error;
    }
  },
  fetchUniqUserData: async (userId) => {
    const { setUsersStatus, setUsers } = get();
    setUsersStatus(Status.Loading);
    try {
      const { data } = await api.get<UserType>(APIRoute.USER(userId));
      setUsers([data], true);
      setUsersStatus(Status.Success);
    } catch (error) {
      setUsersStatus(Status.Error);
      throw error;
    }
  },
  fetchManagersData: async () => {
    const { setManagersStatus, setManagers } = get();
    setManagersStatus(Status.Loading);
    try {
      const { data } = await api.get<ManagerType[]>(APIRoute.MANAGERS);
      setManagers(data);
      setManagersStatus(Status.Success);
    } catch (error) {
      setManagersStatus(Status.Error);
      throw error;
    }
  },
  fetchUniqManagerData: async (managerId) => {
    const { setManagersStatus, setManagers } = get();
    setManagersStatus(Status.Loading);
    try {
      const { data } = await api.get<ManagerType>(APIRoute.MANAGER(managerId));
      setManagers([data], true);
      setManagersStatus(Status.Success);
    } catch (error) {
      setManagersStatus(Status.Error);
      throw error;
    }
  },
  fetchTaskPerformersData: async () => {
    const { setTaskPerformersStatus, setTaskPerformers } = get();
    setTaskPerformersStatus(Status.Loading);
    try {
      const { data } = await api.get<TaskPerformerType[]>(APIRoute.TASK_PERFORMERS);
      setTaskPerformers(data);
      setTaskPerformersStatus(Status.Success);
    } catch (error) {
      setTaskPerformersStatus(Status.Error);
      throw error;
    }
  },
  fetchUniqTaskPerformerData: async (taskPerformerId) => {
    const { setTaskPerformersStatus, setTaskPerformers } = get();
    setTaskPerformersStatus(Status.Loading);
    try {
      const { data } = await api.get<TaskPerformerType>(APIRoute.TASK_PERFORMER(taskPerformerId));
      setTaskPerformers([data], true);
      setTaskPerformersStatus(Status.Success);
    } catch (error) {
      setTaskPerformersStatus(Status.Error);
      throw error;
    }
  },
}));

export const useUserManagementStore = createSelectors(userManagementStore);