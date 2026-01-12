import { X } from "lucide-react"
import { useSelectedFiltersDispatch, useSelectedFiltersState } from '../hooks';
import Actions from '../const';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function AppliedFilters() {
  const selectedFilters = useSelectedFiltersState();
  const dispatch = useSelectedFiltersDispatch();
  const hasSelectedFilters = Object.keys(selectedFilters).length > 0;

  const handleDeleteFilter = (categoryId: string, value: string) => {
    dispatch({
      type: Actions.REMOVE_FILTER_OPTION,
      payload: {
        id: categoryId,
        option: value,
      },
    });
  };

  const handleClearAll = () => {
    dispatch({
      type: Actions.CLEAR_FILTERS,
    });
  };

  return hasSelectedFilters ? (
    <div className="flex flex-wrap gap-2 mt-4">
      {Object.entries(selectedFilters).map(
        ([categoryId, { title, options }]) =>
          options.map(({ value, label }) => (
            <Badge
              key={`${title}-${value}`}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleDeleteFilter(categoryId, value)}
            >
              {`${title}: ${label}`}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )),
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleClearAll}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        Очистить
      </Button>
    </div>
  ) : null;
}

export default AppliedFilters;
