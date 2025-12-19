import { create, StoreApi, UseBoundStore } from 'zustand';
import createAPI from '../../../services/api/api';
import { BushType, PetrolStationType, StatusType } from '../../../types';
import { Status } from '../../../const';
import { APIRoute } from '../../../const';
import { createSelectors } from '../../create-selectors';

const api = createAPI();

interface State {
  petrolStations: {
    entities: Record<string, PetrolStationType>;
    ids: string[];
    status: StatusType;
  };
  bushes: {
    entities: Record<string, BushType>;
    ids: string[];
    status: StatusType;
  };
}

interface Actions {
  setPetrolStations: (data: PetrolStationType[]) => void;
  setPetrolStationsStatus: (status: StatusType) => void;
  setBushes: (data: BushType[]) => void;
  setBushesStatus: (status: StatusType) => void;
  fetchPetrolStations: () => Promise<void>;
  fetchBushes: () => Promise<void>;
}

const locationDataStore = create<State & Actions>((set, get) => ({
  petrolStations: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  bushes: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  setPetrolStations: (data) =>
    set((state) => {
      const entities = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, PetrolStationType>);
      const ids = data.map((item) => item.id);
      return {
        petrolStations: {
          ...state.petrolStations,
          entities,
          ids,
        },
      };
    }),
  setPetrolStationsStatus: (status) =>
    set((state) => ({
      petrolStations: {
        ...state.petrolStations,
        status,
      },
    })),
  setBushes: (data) =>
    set((state) => {
      const entities = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, BushType>);
      const ids = data.map((item) => item.id);
      return {
        bushes: {
          ...state.bushes,
          entities,
          ids,
        },
      };
    }),
  setBushesStatus: (status) =>
    set((state) => ({
      bushes: {
        ...state.bushes,
        status,
      },
    })),
  fetchPetrolStations: async () => {
    const { setPetrolStationsStatus, setPetrolStations } = get();
    setPetrolStationsStatus(Status.Loading);
    try {
      const { data } = await api.get<PetrolStationType[]>(APIRoute.PETROL_STATION);
      setPetrolStations(data);
      setPetrolStationsStatus(Status.Success);
    } catch (error) {
      setPetrolStationsStatus(Status.Error);
      throw error;
    }
  },
  fetchBushes: async () => {
    const { setBushesStatus, setBushes } = get();
    setBushesStatus(Status.Loading);
    try {
      const { data } = await api.get<BushType[]>(APIRoute.BUSH);
      setBushes(data);
      setBushesStatus(Status.Success);
    } catch (error) {
      setBushesStatus(Status.Error);
      throw error;
    }
  },
}));

export const useLocationDataStore = createSelectors(locationDataStore);