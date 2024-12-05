import { createSelector } from "@reduxjs/toolkit";
import { Status } from "../../../const";
import { AuthDataType, NameSpace } from "../..";
import { InitialStateType } from "../../reducer";

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

export const getAuthData = (state: AuthStateType): AuthDataType['username'] | undefined =>
  state[NameSpace.Auth].authData;