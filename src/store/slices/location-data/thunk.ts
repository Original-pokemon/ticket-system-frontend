import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, BushType, PetrolStationType } from '../../../types';
import { NameSpace } from '../..';
import { APIRoute } from '../../../const';

export const fetchPetrolStationData = createAsyncThunk<
  PetrolStationType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.LocationData}/fetchPetrolStationData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<PetrolStationType[]>(APIRoute.PETROL_STATION);

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchBushData = createAsyncThunk<
  BushType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.LocationData}/fetchBushData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<BushType[]>(APIRoute.BUSH);

    return data
  } catch (error) {
    throw error;
  }
});