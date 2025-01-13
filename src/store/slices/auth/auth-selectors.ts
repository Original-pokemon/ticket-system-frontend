import { createSelector } from "@reduxjs/toolkit";
import { Status } from "../../../const";
import { AuthDataType } from "../..";
import { InitialStateType } from "../../reducer";
import { NameSpace } from "../../const";

type AuthStateType = Pick<InitialStateType, typeof NameSpace.Auth>;

export const getAuthStatus = createSelector(
  (state: AuthStateType) => state[NameSpace.Auth].status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getAuthData = (state: AuthStateType): boolean =>
  state[NameSpace.Auth].authData;