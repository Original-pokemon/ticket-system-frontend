import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { InitialStateType } from "../../reducer";
import { bushesAdapter, petrolStationsAdapter } from "./location-data";
import { Status } from "../../../const";
import { StatusType } from "../../../types";


type LocationDataStateType = Pick<
  InitialStateType,
  typeof NameSpace.LocationData
>;

export const {
  selectAll: selectAllPetrolStations,
  selectById: selectPetrolStationById,
} = petrolStationsAdapter.getSelectors(
  (state: LocationDataStateType) => state[NameSpace.LocationData].petrolStations
);

export const {
  selectAll: selectAllBushes,
  selectById: selectBushById,
} = bushesAdapter.getSelectors(
  (state: LocationDataStateType) => state[NameSpace.LocationData].bushes
);

export const getPetrolStationsStatus = createSelector(
  (state: LocationDataStateType) => state[NameSpace.LocationData].petrolStations.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getBushesStatus = createSelector(
  (state: LocationDataStateType) => state[NameSpace.LocationData].bushes.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getLocationDataStatus = createSelector(
  getPetrolStationsStatus,
  getBushesStatus,
  (petrolStationsStatus, bushesStatus) => {
    const statuses = [petrolStationsStatus.status, bushesStatus.status];

    let status: StatusType = Status.Idle;

    if (statuses.every((status) => status === Status.Success)) {
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
    }
  },
);
