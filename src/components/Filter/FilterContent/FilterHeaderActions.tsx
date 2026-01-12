import React from 'react';
import { RefreshCw } from "lucide-react"
import { Button } from '@/components/ui/button';
import { useSelectedFiltersState } from '../hooks';

type FilterHeaderActionsProperties = {
  hasTempSelectedFilters: boolean;
  onClearTempFilters: () => void;
};

const FilterHeaderActions: React.FC<FilterHeaderActionsProperties> = ({
  hasTempSelectedFilters,
  onClearTempFilters,
}) => {
  const selectedFilters = useSelectedFiltersState();
  const hasSelectedFilters = Object.keys(selectedFilters).length > 0;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClearTempFilters}
      disabled={!hasTempSelectedFilters}
      aria-label="Сбросить фильтры"
      className={hasSelectedFilters ? "text-orange-500" : ""}
    >
      <RefreshCw className="h-4 w-4" />
    </Button>
  );
};

export default FilterHeaderActions;
