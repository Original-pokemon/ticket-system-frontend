/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { EntityState } from '@reduxjs/toolkit';
import { fetchPetrolStationData, fetchBushData } from './thunk';
import { BushType, PetrolStationType, StatusType } from '../../../types';
import { Status } from '../../../const';
import { NameSpace } from '../..';

export const petrolStationsAdapter = createEntityAdapter<PetrolStationType, string>({
  selectId: (petrolStation) => petrolStation.id,
});

export const bushesAdapter = createEntityAdapter<BushType, string>({
  selectId: (bush) => bush.id,
});

type PetrolStationsState = EntityState<PetrolStationType, string> & { status: StatusType };
type BushesState = EntityState<BushType, string> & { status: StatusType };

type InitialStateType = {
  petrolStations: PetrolStationsState;
  bushes: BushesState;
};

const initialState: InitialStateType = {
  petrolStations: petrolStationsAdapter.getInitialState({ status: Status.Idle }),
  bushes: bushesAdapter.getInitialState({ status: Status.Idle }),
};

const locationDataSlice = createSlice({
  name: NameSpace.LocationData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка fetchPetrolStationData
    builder
      .addCase(fetchPetrolStationData.pending, (state) => {
        state.petrolStations.status = Status.Loading;
      })
      .addCase(fetchPetrolStationData.fulfilled, (state, action) => {
        state.petrolStations.status = Status.Success;
        petrolStationsAdapter.setAll(state.petrolStations, action.payload);
      })
      .addCase(fetchPetrolStationData.rejected, (state) => {
        state.petrolStations.status = Status.Error;
      });

    // Обработка fetchBushData
    builder
      .addCase(fetchBushData.pending, (state) => {
        state.bushes.status = Status.Loading;
      })
      .addCase(fetchBushData.fulfilled, (state, action) => {
        state.bushes.status = Status.Success;
        bushesAdapter.setAll(state.bushes, action.payload);
      })
      .addCase(fetchBushData.rejected, (state) => {
        state.bushes.status = Status.Error;
      });
  },
});

export default locationDataSlice.reducer;
