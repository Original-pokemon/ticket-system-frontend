import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "../..";
import { InitialStateType } from "../../reducer";
import { managersAdapter, taskPerformersAdapter, usersAdapter } from "./user-management";
import { Status } from "../../../const";
import { StatusType } from "../../../types";

type UserManagementStateType = Pick<
  InitialStateType,
  typeof NameSpace.UserManagement
>;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(
  (state: UserManagementStateType) => state[NameSpace.UserManagement].users
);

export const {
  selectAll: selectAllManagers,
  selectById: selectManagerById,
} = managersAdapter.getSelectors(
  (state: UserManagementStateType) => state[NameSpace.UserManagement].managers
);

export const {
  selectAll: selectAllTaskPerformers,
  selectById: selectTaskPerformerById,
} = taskPerformersAdapter.getSelectors(
  (state: UserManagementStateType) => state[NameSpace.UserManagement].taskPerformers
);


export const getManagersStatus = createSelector(
  (state: UserManagementStateType) => state[NameSpace.UserManagement].managers.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getTaskPerformersStatus = createSelector(
  (state: UserManagementStateType) => state[NameSpace.UserManagement].taskPerformers.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getUsersStatus = createSelector(
  (state: UserManagementStateType) => state[NameSpace.UserManagement].users.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);


export const getUserManagementStatus = createSelector(
  getManagersStatus,
  getTaskPerformersStatus,
  getUsersStatus,
  (managersStatus, usersStatus, taskPerformersStatus) => {
    const statuses = [managersStatus.status, usersStatus.status, taskPerformersStatus.status];

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
