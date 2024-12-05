/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { EntityState } from '@reduxjs/toolkit';
import {
  fetchUsersData,
  fetchUniqUserData,
  fetchManagersData,
  fetchUniqManagerData,
  fetchTaskPerformersData,
  fetchUniqTaskPerformerData,
} from './thunk';
import { ManagerType, StatusType, UserType } from '../../../types';
import { TaskPerformerType } from '../../../types/task-performer';
import { Status } from '../../../const';
import { NameSpace } from '../..';

export const usersAdapter = createEntityAdapter<UserType, string>({
  selectId: (user) => user.id,
});

export const managersAdapter = createEntityAdapter<ManagerType, string>({
  selectId: (manager) => manager.id,
});

export const taskPerformersAdapter = createEntityAdapter<TaskPerformerType, string>({
  selectId: (taskPerformer) => taskPerformer.id,
});

type UsersState = EntityState<UserType, string> & { status: StatusType };
type ManagersState = EntityState<ManagerType, string> & { status: StatusType };
type TaskPerformersState = EntityState<TaskPerformerType, string> & { status: StatusType };

type InitialStateType = {
  users: UsersState;
  managers: ManagersState;
  taskPerformers: TaskPerformersState;
};

const initialState: InitialStateType = {
  users: usersAdapter.getInitialState({ status: Status.Idle }),
  managers: managersAdapter.getInitialState({ status: Status.Idle }),
  taskPerformers: taskPerformersAdapter.getInitialState({ status: Status.Idle }),
};

const userManagementSlice = createSlice({
  name: NameSpace.UserManagement,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка fetchUsersData
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.users.status = Status.Loading;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.users.status = Status.Success;
        usersAdapter.setAll(state.users, action.payload);
      })
      .addCase(fetchUsersData.rejected, (state) => {
        state.users.status = Status.Error;
      });

    // Обработка fetchUniqUserData
    builder
      .addCase(fetchUniqUserData.pending, (state) => {
        state.users.status = Status.Loading;
      })
      .addCase(fetchUniqUserData.fulfilled, (state, action) => {
        state.users.status = Status.Success;
        usersAdapter.upsertOne(state.users, action.payload);
      })
      .addCase(fetchUniqUserData.rejected, (state) => {
        state.users.status = Status.Error;
      });

    // Обработка fetchManagersData
    builder
      .addCase(fetchManagersData.pending, (state) => {
        state.managers.status = Status.Loading;
      })
      .addCase(fetchManagersData.fulfilled, (state, action) => {
        state.managers.status = Status.Success;
        managersAdapter.setAll(state.managers, action.payload);
      })
      .addCase(fetchManagersData.rejected, (state) => {
        state.managers.status = Status.Error;
      });

    // Обработка fetchUniqManagerData
    builder
      .addCase(fetchUniqManagerData.pending, (state) => {
        state.managers.status = Status.Loading;
      })
      .addCase(fetchUniqManagerData.fulfilled, (state, action) => {
        state.managers.status = Status.Success;
        managersAdapter.upsertOne(state.managers, action.payload);
      })
      .addCase(fetchUniqManagerData.rejected, (state) => {
        state.managers.status = Status.Error;
      });

    // Обработка fetchTaskPerformersData
    builder
      .addCase(fetchTaskPerformersData.pending, (state) => {
        state.taskPerformers.status = Status.Loading;
      })
      .addCase(fetchTaskPerformersData.fulfilled, (state, action) => {
        state.taskPerformers.status = Status.Success;
        taskPerformersAdapter.setAll(state.taskPerformers, action.payload);
      })
      .addCase(fetchTaskPerformersData.rejected, (state) => {
        state.taskPerformers.status = Status.Error;
      });

    // Обработка fetchUniqTaskPerformerData
    builder
      .addCase(fetchUniqTaskPerformerData.pending, (state) => {
        state.taskPerformers.status = Status.Loading;
      })
      .addCase(fetchUniqTaskPerformerData.fulfilled, (state, action) => {
        state.taskPerformers.status = Status.Success;
        taskPerformersAdapter.upsertOne(state.taskPerformers, action.payload);
      })
      .addCase(fetchUniqTaskPerformerData.rejected, (state) => {
        state.taskPerformers.status = Status.Error;
      });
  },
});

export default userManagementSlice.reducer;
