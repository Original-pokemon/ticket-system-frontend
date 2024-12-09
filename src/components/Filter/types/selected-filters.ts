import type { FilterSectionType } from '.';

export type SelectedFiltersType = {
  [key: FilterSectionType['id']]: Omit<FilterSectionType, 'id'>;
};
