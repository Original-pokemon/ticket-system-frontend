import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, AttachmentType, BushType, CategoryType, CommentType, ManagerType, PetrolStationType, TicketType, UserType } from '../../../types';
import { NameSpace } from '../../const';
import { APIRoute } from '../../../const';
import { TaskPerformerType } from '../../../types/task-performer';

export const fetchUsersData = createAsyncThunk<
  UserType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.UserManagement}/fetchUsersData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<UserType[]>(APIRoute.USERS);

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchUniqUserData = createAsyncThunk<
  UserType,
  string,
  AsyncThunkConfig
>(`${NameSpace.UserManagement}/fetchUniqUserData`, async (userId, { extra: api }) => {
  try {
    const { data } = await api.get<UserType>(APIRoute.USER(userId));

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchManagersData = createAsyncThunk<
  ManagerType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.UserManagement}/fetchManagersData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<ManagerType[]>(APIRoute.MANAGERS);

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchUniqManagerData = createAsyncThunk<
  ManagerType,
  string,
  AsyncThunkConfig
>(`${NameSpace.UserManagement}/fetchUniqManagerData`, async (managerId, { extra: api }) => {
  try {
    const { data } = await api.get<ManagerType>(APIRoute.MANAGER(managerId));

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchTaskPerformersData = createAsyncThunk<
  TaskPerformerType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.UserManagement}/fetchTaskPerformersData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<TaskPerformerType[]>(APIRoute.TASK_PERFORMERS);

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchUniqTaskPerformerData = createAsyncThunk<
  TaskPerformerType,
  string,
  AsyncThunkConfig
>(`${NameSpace.UserManagement}/fetchUniqTaskPerformerData`, async (taskPerformerId, { extra: api }) => {
  try {
    const { data } = await api.get<TaskPerformerType>(APIRoute.TASK_PERFORMER(taskPerformerId));

    return data;
  } catch (error) {
    throw error;
  }
});
