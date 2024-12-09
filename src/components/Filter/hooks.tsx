import { useContext, useEffect, useRef } from 'react';
import { FilterDispatchContext, FilterStateContext } from './filter-context';

export const useEffectSkipMount = (callback: () => void, deps: any[]) => {
  const mounted = useRef(true);

  useEffect(() => {
    if (!mounted.current) {
      return callback();
    }

    mounted.current = false;
  }, [callback, ...deps]);
};

export const useSelectedFiltersState = () => {
  const context = useContext(FilterStateContext);

  if (context === undefined) {
    throw new Error(
      'useSelectedFilters must be used within a SelectedFiltersProvider',
    );
  }

  return context;
};

export const useSelectedFiltersDispatch = () => {
  const context = useContext(FilterDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useSelectedFiltersDispatch must be used within a SelectedFiltersProvider',
    );
  }

  return context;
};
