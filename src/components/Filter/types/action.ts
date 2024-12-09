import type { FilterSectionType } from '.';
import Actions from '../const';

type AddFilterActionType = {
  type: Actions.ADD_FILTER;
  payload: { id: string; filter: Omit<FilterSectionType, 'id'> };
};

type RemoveFilterActionType = {
  type: Actions.REMOVE_FILTER;
  payload: { id: string };
};

type ClearFiltersActionType = {
  type: Actions.CLEAR_FILTERS;
};

type UpdateFilterActionType = {
  type: Actions.UPDATE_FILTER;
  payload: { id: string; filter: Omit<FilterSectionType, 'id'> };
};

type RemoveFilterOptionActionType = {
  type: Actions.REMOVE_FILTER_OPTION;
  payload: { id: string; option: string };
};

export type ActionType =
  | AddFilterActionType
  | RemoveFilterActionType
  | ClearFiltersActionType
  | UpdateFilterActionType
  | RemoveFilterOptionActionType;
