import { Box, Chip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelectedFiltersDispatch, useSelectedFiltersState } from '../hooks';
import Actions from '../const';

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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {Object.entries(selectedFilters).map(
          ([categoryId, { title, options }]) =>
            options.map(({ value, label }) => (
              <Chip
                key={`${title}-${value}`}
                label={`${title}: ${label}`}
                onDelete={() => handleDeleteFilter(categoryId, value)}
              />
            )),
        )}

        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleClearAll}
          sx={{ ml: 2 }}
        >
          Очистить
        </Button>
      </Box>
  ) : null;
}

export default AppliedFilters;
