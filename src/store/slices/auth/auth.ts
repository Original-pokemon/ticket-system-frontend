/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../const';
import { StatusType } from '../../../types';
import { dropToken } from '../../../services/api';
import * as _ from '.';
import { AuthDataType, NameSpace } from '../..';


type InitialStateType = {
  status: StatusType;
  authData?: AuthDataType['username'];
};

const initialState: InitialStateType = {
  status: Status.Idle,
  authData: undefined,
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
        state.authData = action.payload;
      })
      .addCase(_.postAuthData.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(_.logout.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(_.logout.fulfilled, (state) => {
        state.status = Status.Success;
        state.authData = undefined;
      })
      .addCase(_.logout.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export default authDataSlice.reducer;
