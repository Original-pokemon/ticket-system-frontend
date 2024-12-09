import React from 'react';
import { IconButton, Badge } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

type FilterHeaderActionsProperties = {
  hasTempSelectedFilters: boolean;
  onClearTempFilters: () => void;
};

const FilterHeaderActions: React.FC<FilterHeaderActionsProperties> = ({
  hasTempSelectedFilters,
  onClearTempFilters,
}) => {
  return (
    <IconButton
      onClick={onClearTempFilters}
      disabled={!hasTempSelectedFilters}
      aria-label="Сбросить фильтры"
    >
      <Badge
        color="secondary"
        variant="dot"
        invisible={!hasTempSelectedFilters}
      >
        <RefreshIcon />
      </Badge>
    </IconButton>
  );
};

export default FilterHeaderActions;
