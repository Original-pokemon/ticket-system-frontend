import React from 'react';
import { FilterList, FilterListItem } from 'react-admin';
import { LucideIcon } from 'lucide-react';

type FilterOption = {
  label: string;
  value: string | number;
};

type Filters = {
  [key: string]: (string | number)[];
};

type CategoriesFilterProps = {
  label: string;
  icon: LucideIcon;
  filterKey: string;
  filterOptions: FilterOption[];
};

export const FilterSection: React.FC<CategoriesFilterProps> = ({
  label,
  icon: Icon,
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
    <FilterList label={label} icon={<Icon className="w-4 h-4" />} >
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
