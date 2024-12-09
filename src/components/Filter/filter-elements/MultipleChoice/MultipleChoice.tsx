import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Typography,
} from '@mui/material';
import React from 'react';
import { FilterSectionType } from '../../types';
import {
  useSelectedFiltersDispatch,
  useSelectedFiltersState,
} from '../../hooks';
import Actions from '../../const';

function MultipleChoice({ id, title, options }: FilterSectionType) {
  const selectedFilters = useSelectedFiltersState();
  const dispatch = useSelectedFiltersDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const isSelected = event.target.checked;

    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );

    if (selectedOption) {
      let selected = selectedFilters[id]?.options || [];

      selected = isSelected
        ? [...selected, selectedOption]
        : selected.filter((option) => option.value !== selectedValue);

      if (selected.length > 0) {
        dispatch({
          type: Actions.ADD_FILTER,
          payload: {
            id,
            filter: {
              title,
              options: selected,
            },
          },
        });
      } else {
        dispatch({
          type: Actions.REMOVE_FILTER,
          payload: {
            id,
          },
        });
      }
    }
  };

  const selectedOptions = selectedFilters[id]?.options || [];
  const selectedValuesSet = new Set(
    selectedOptions.map((option) => option.value),
  );

  return (
    <FormControl id={id} sx={{ p: 2 }}>
      <Typography variant="subtitle1">{title}</Typography>
      <FormGroup>
        {options.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Checkbox
                checked={selectedValuesSet.has(value)}
                onChange={handleChange}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export type MultipleChoiceType = ReturnType<typeof MultipleChoice>;

export default React.memo(MultipleChoice);
