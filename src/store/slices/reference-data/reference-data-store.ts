import { create } from 'zustand';
import createAPI from '../../../services/api/api';
import { CategoryType, TicketStatusType, StatusType } from '../../../types';
import { Status } from '../../../const';
import { APIRoute } from '../../../const';
import { createSelectors } from '../../create-selectors';

const api = createAPI();

interface State {
  categories: {
    entities: Record<string, CategoryType>;
    ids: string[];
    status: StatusType;
  };
  statuses: {
    entities: Record<string, TicketStatusType>;
    ids: string[];
    status: StatusType;
  };
}

interface Actions {
  setCategories: (data: CategoryType[]) => void;
  setCategoriesStatus: (status: StatusType) => void;
  setStatuses: (data: TicketStatusType[]) => void;
  setStatusesStatus: (status: StatusType) => void;
  fetchCategoriesData: () => Promise<void>;
  fetchStatusesData: () => Promise<void>;
}

const referenceDataStore = create<State & Actions>((set, get) => ({
  categories: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  statuses: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  setCategories: (data) =>
    set((state) => {
      const entities = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, CategoryType>);
      const ids = data.map((item) => item.id);
      return {
        categories: {
          ...state.categories,
          entities,
          ids,
        },
      };
    }),
  setCategoriesStatus: (status) =>
    set((state) => ({
      categories: {
        ...state.categories,
        status,
      },
    })),
  setStatuses: (data) =>
    set((state) => {
      const entities = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, TicketStatusType>);
      const ids = data.map((item) => item.id);
      return {
        statuses: {
          ...state.statuses,
          entities,
          ids,
        },
      };
    }),
  setStatusesStatus: (status) =>
    set((state) => ({
      statuses: {
        ...state.statuses,
        status,
      },
    })),
  fetchCategoriesData: async () => {
    const { setCategoriesStatus, setCategories } = get();
    setCategoriesStatus(Status.Loading);
    try {
      const { data } = await api.get<CategoryType[]>(APIRoute.CATEGORIES);
      setCategories(data);
      setCategoriesStatus(Status.Success);
    } catch (error) {
      setCategoriesStatus(Status.Error);
      throw error;
    }
  },
  fetchStatusesData: async () => {
    const { setStatusesStatus, setStatuses } = get();
    setStatusesStatus(Status.Loading);
    try {
      const { data } = await api.get<TicketStatusType[]>(APIRoute.STATUS);
      setStatuses(data);
      setStatusesStatus(Status.Success);
    } catch (error) {
      setStatusesStatus(Status.Error);
      throw error;
    }
  },
}));

export const useReferenceDataStore = createSelectors(referenceDataStore);