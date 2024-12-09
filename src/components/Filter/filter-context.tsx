import { createContext, Dispatch } from 'react';
import type { ActionType, SelectedFiltersType } from './types';

export const FilterStateContext = createContext<
  SelectedFiltersType | undefined
>(undefined);
export const FilterDispatchContext = createContext<
  Dispatch<ActionType> | undefined
>(undefined);
