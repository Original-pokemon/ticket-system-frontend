/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { EntityState } from '@reduxjs/toolkit';
import { fetchCategoriesData, fetchStatusesData } from './thunk';
import { CategoryType, StatusType, TicketStatusType } from '../../../types';
import { Status } from '../../../const';
import { NameSpace } from '../..';

export const categoriesAdapter = createEntityAdapter<CategoryType, string>({
  selectId: (category) => category.id,
});

export const statusesAdapter = createEntityAdapter<TicketStatusType, string>({
  selectId: (status) => status.id,
});

type CategoriesState = EntityState<CategoryType, string> & { status: StatusType };
type StatusesState = EntityState<TicketStatusType, string> & { status: StatusType };

type InitialStateType = {
  categories: CategoriesState;
  statuses: StatusesState;
};

const initialState: InitialStateType = {
  categories: categoriesAdapter.getInitialState({ status: Status.Idle }),
  statuses: statusesAdapter.getInitialState({ status: Status.Idle }),
};

const referenceDataSlice = createSlice({
  name: NameSpace.ReferenceData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка fetchCategoriesData
    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.categories.status = Status.Loading;
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.categories.status = Status.Success;
        categoriesAdapter.setAll(state.categories, action.payload);
      })
      .addCase(fetchCategoriesData.rejected, (state) => {
        state.categories.status = Status.Error;
      });

    // Обработка fetchStatusesData
    builder
      .addCase(fetchStatusesData.pending, (state) => {
        state.statuses.status = Status.Loading;
      })
      .addCase(fetchStatusesData.fulfilled, (state, action) => {
        state.statuses.status = Status.Success;
        statusesAdapter.setAll(state.statuses, action.payload);
      })
      .addCase(fetchStatusesData.rejected, (state) => {
        state.statuses.status = Status.Error;
      });
  },
});

export default referenceDataSlice.reducer;
