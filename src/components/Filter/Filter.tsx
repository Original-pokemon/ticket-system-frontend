import { ReactElement, useReducer, useRef, useState } from 'react';
import { Filter as FilterIcon } from "lucide-react"
import AppliedFilters from './AppliedFilters/AppliedFilters';
import FilterContent from './FilterContent/FilterContent';
import MultipleChoice from './filter-elements/MultipleChoice/MultipleChoice';
import SingleChoice from './filter-elements/SingleChoice/SingleChoice';
import FilterTextField from './filter-elements/FilterTextField/FilterTextField';
import { useEffectSkipMount } from './hooks';
import Actions from './const';
import type { ActionType, FilterSectionType, SelectedFiltersType } from './types';
import { FilterDispatchContext, FilterStateContext } from './filter-context';
import { useSearchParams } from 'react-router-dom';
import { buildSearchParamsFromFilters, parseSearchParamsToFilters } from './url-filter-utils';
import { Button } from '@/components/ui/button';

export type FilterMetaType = {
  [key: FilterSectionType['id']]: Omit<FilterSectionType, 'id'>;
}

type FilterProperties = {
  children: ReactElement | ReactElement[];
  onChange: ({ key, value }: SelectedFiltersType) => void;
  filterMeta: FilterMetaType
};

function filterReducer(
  state: SelectedFiltersType,
  action: ActionType,
): SelectedFiltersType {
  switch (action.type) {
    case Actions.ADD_FILTER: {
      const { id, filter } = action.payload;
      const existingFilter = state[id];

      if (
        existingFilter &&
        JSON.stringify(existingFilter.options) ===
        JSON.stringify(filter.options)
      ) {
        return state;
      }

      return {
        ...state,
        [id]: filter,
      };
    }
    case Actions.REMOVE_FILTER: {
      const { [action.payload.id]: removedFilter, ...rest } = state;
      return rest;
    }
    case Actions.REMOVE_FILTER_OPTION: {
      const { id, option: value } = action.payload;
      const existingFilter = state[id];

      if (!existingFilter) {
        return state;
      }

      const existingFilterOptions = existingFilter.options.filter(
        (option) => option.value !== value,
      );

      if (existingFilterOptions.length === 0) {
        const newState = { ...state };
        delete newState[id];
        return newState;
      }

      return {
        ...state,
        [id]: { ...existingFilter, options: existingFilterOptions },
      };
    }
    case Actions.CLEAR_FILTERS: {
      return {};
    }
    default: {
      return state;
    }
  }
}
function Filter({ children, onChange, filterMeta }: FilterProperties) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(filterReducer, {}, () => parseSearchParamsToFilters(searchParams, filterMeta));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const previousStateReference = useRef<SelectedFiltersType | null>(null);

  const hasSelectedFilters = Object.keys(state || {}).length > 0;

  const handleDrawerOpen = () => setDrawerOpen(true);

  const handleDrawerClose = () => setDrawerOpen(false);

  useEffectSkipMount(() => {
    if (
      JSON.stringify(previousStateReference.current) === JSON.stringify(state)
    ) {
      return;
    }

    previousStateReference.current = state;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onChange(state);
      const newSearchParams = buildSearchParamsFromFilters(state);
      setSearchParams(newSearchParams);
    }, 300);
  }, [state, onChange, setSearchParams]);

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        <Button
          variant={hasSelectedFilters ? "default" : "outline"}
          size="sm"
          onClick={handleDrawerOpen}
          aria-label="Фильтры"
        >
          <FilterIcon className="mr-2 h-4 w-4" />
          {`Фильтры${hasSelectedFilters ? ` (${Object.keys(state).length})` : ''}`}
        </Button>

        {/* Выдвижная панель с фильтрами */}
        <FilterContent open={drawerOpen} onClose={handleDrawerClose}>
          {children}
        </FilterContent>

        {/* Отображение выбранных фильтров */}
        <AppliedFilters />
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}

Filter.SingleChoice = SingleChoice;
Filter.FilterTextField = FilterTextField;
Filter.MultipleChoice = MultipleChoice;

export default Filter;
