import { Box } from '@mui/material';
import React from 'react';
import type { MultipleChoiceType } from '../filter-elements/MultipleChoice/MultipleChoice';
import type { SingleChoiceType } from '../filter-elements/SingleChoice/SingleChoice';
import type { FilterTextFieldType } from '../filter-elements/FilterTextField/FilterTextField';
import FilterHeaderActions from './FilterHeaderActions';
import { useSelectedFiltersDispatch, useSelectedFiltersState } from '../hooks';
import Actions from '../const';
import DataDrawer from '../../layouts/data-layouts/DataDrawer/DataDrawer';

export type FilterElementsType =
  | MultipleChoiceType
  | FilterTextFieldType
  | SingleChoiceType;

type FilterContentProperties = {
  open: boolean;
  onClose: () => void;
  children: FilterElementsType | FilterElementsType[];
};

function FilterContent({ children, open, onClose }: FilterContentProperties) {
  const dispatch = useSelectedFiltersDispatch();
  const selectedFilters = useSelectedFiltersState();

  const handleClearTemporaryFilters = () => {
    dispatch({ type: Actions.CLEAR_FILTERS });
  };

  const hasTemporarySelectedFilters = Object.keys(selectedFilters).length > 0;

  return (
    <DataDrawer
      open={open}
      onClose={onClose}
      direction="left"
      maxSize="sm"
      sx={{ width: 320 }}
    >
      <DataDrawer.Header
        title="Фильтры"
        onClose={onClose}
        headerActions={
          <FilterHeaderActions
            hasTempSelectedFilters={hasTemporarySelectedFilters}
            onClearTempFilters={handleClearTemporaryFilters}
          />
        }
      />

      <DataDrawer.Body>
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>{children}</Box>
      </DataDrawer.Body>
    </DataDrawer>
  );
}

export default React.memo(FilterContent);
