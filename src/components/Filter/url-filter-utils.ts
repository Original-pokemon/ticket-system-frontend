import { FilterMetaType } from "./Filter";
import { SelectedFiltersType } from "./types";

/**
 * Преобразует query-параметры в объект SelectedFiltersType.
 *
 * @param searchParams URLSearchParams
 * @returns объект SelectedFiltersType, где ключ = id фильтра, значение = { title, options }
 */
export function parseSearchParamsToFilters(
  searchParams: URLSearchParams,
  filterMeta: FilterMetaType
): SelectedFiltersType {
  const result: SelectedFiltersType = {};


  for (const [filterId, rawValue] of searchParams.entries()) {

    if (!filterMeta[filterId]) {
      continue;
    }

    const values = rawValue.split(',');
    const { title, options } = filterMeta[filterId];

    result[filterId] = {
      title: title,
      options: values.map((v) => {
        const option = options.find((opt) => opt.value === v);

        return option ?? { value: v, label: v };
      }),
    };
  }

  return result;
}


/**
 * Преобразует объект SelectedFiltersType в URLSearchParams.
 *
 * @param filters объект типа SelectedFiltersType
 * @returns URLSearchParams для записи в URL
 */
export function buildSearchParamsFromFilters(
  filters: SelectedFiltersType,
  preserveParams?: URLSearchParams
): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (preserveParams) {
    preserveParams.forEach((value, key) => {
      searchParams.set(key, value);
    });
  }

  Object.entries(filters).forEach(([id, filterSection]) => {
    const commaSeparated = filterSection.options.map((opt) => opt.value).join(',');
    searchParams.set(id, commaSeparated);
  });

  return searchParams;
}
