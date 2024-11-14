import React from 'react';
import { FilterList, FilterListItem } from 'react-admin';
import { SvgIconComponent } from '@mui/icons-material';
import { Chip, Card, CardContent } from '@mui/material';

type FilterOption = {
  label: string;
  value: string | number;
};

type Filters = {
  [key: string]: (string | number)[];
};

type CategoriesFilterProps = {
  label: string;
  icon: React.ReactElement<SvgIconComponent>;
  filterKey: string;
  filterOptions: FilterOption[];
};

export const FilterSection: React.FC<CategoriesFilterProps> = ({
  label,
  icon,
  filterKey,
  filterOptions,
}) => {
  const isSelected = (value: FilterOption["value"], filters: Filters): boolean => {
    const selectedValues = filters[filterKey] || [];
    return selectedValues.includes(value);
  };

  const toggleFilter = (value: FilterOption["value"], filters: Filters): Filters => {
    const selectedValues = filters[filterKey] || [];

    return {
      ...filters,
      [filterKey]: selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value],
    };
  };

  return (
    <FilterList label={label} icon={icon} >
      {filterOptions.map(({ value, label }) => (
        <FilterListItem
          key={value}
          label={label}
          value={value}
          isSelected={isSelected}
          toggleFilter={toggleFilter}
        />
      ))}
    </FilterList>
  );
};
