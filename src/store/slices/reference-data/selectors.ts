import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { InitialStateType } from "../../reducer";
import { categoriesAdapter, statusesAdapter } from "./reference-data";
import { Status } from "../../../const";
import { StatusType } from "../../../types";

type LocationDataStateType = Pick<
  InitialStateType,
  typeof NameSpace.ReferenceData
>;


export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors(
  (state: LocationDataStateType) => state[NameSpace.ReferenceData].categories
);

export const {
  selectAll: selectAllStatuses,
  selectById: selectStatusById,
} = statusesAdapter.getSelectors(
  (state: LocationDataStateType) => state[NameSpace.ReferenceData].statuses
);

export const getTicketStatusesStatus = createSelector(
  (state: LocationDataStateType) => state[NameSpace.ReferenceData].statuses.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getCategoriesStatus = createSelector(
  (state: LocationDataStateType) => state[NameSpace.ReferenceData].categories.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getReferenceDataStatus = createSelector(
  getTicketStatusesStatus,
  getCategoriesStatus,
  (categoriesStatus, ticketStatusesStatus) => {
    const statuses = [categoriesStatus.status, ticketStatusesStatus.status];

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
