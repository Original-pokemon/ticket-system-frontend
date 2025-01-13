/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../const';
import { StatusType } from '../../../types';
import * as _ from '.';
import { NameSpace } from '../../const';
import { AuthDataType } from '.';


type InitialStateType = {
  status: StatusType;
  authData: boolean;
};

const initialState: InitialStateType = {
  status: Status.Idle,
  authData: false,
};

const authDataSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(_.postAuthData.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(_.postAuthData.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.authData = true;
      })
      .addCase(_.postAuthData.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(_.logout.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(_.logout.fulfilled, (state) => {
        state.status = Status.Success;
        state.authData = false;
      })
      .addCase(_.logout.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(_.checkAuth.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(_.checkAuth.fulfilled, (state) => {
        state.status = Status.Success;
        state.authData = true;
      })
      .addCase(_.checkAuth.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export default authDataSlice.reducer;
