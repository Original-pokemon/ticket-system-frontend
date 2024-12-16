import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, BushType, CategoryType, PetrolStationType } from '../../../types';
import { NameSpace } from '../../const';
import { APIRoute } from '../../../const';

export const fetchCategoriesData = createAsyncThunk<
  CategoryType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.ReferenceData}/fetchCategoriesData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<CategoryType[]>(APIRoute.CATEGORIES);

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchStatusesData = createAsyncThunk<
  BushType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.ReferenceData}/fetchBushData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<BushType[]>(APIRoute.STATUS);

    return data
  } catch (error) {
    throw error;
  }
});