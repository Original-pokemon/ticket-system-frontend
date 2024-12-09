import {
  FormControlLabel,
  RadioGroup,
  Radio,
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

type SingleChoiceComponentProperties = FilterSectionType & {
  defaultValue: string;
};

function SingleChoice({
  id,
  title,
  options,
  defaultValue,
}: SingleChoiceComponentProperties) {
  const selectedFilters = useSelectedFiltersState();
  const dispatch = useSelectedFiltersDispatch();

  const selected = selectedFilters[id]?.options[0]?.value || defaultValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );

    if (selectedOption) {
      dispatch({
        type: Actions.ADD_FILTER,
        payload: {
          id,
          filter: {
            title,
            options: [
              { label: selectedOption.label, value: selectedOption.value },
            ],
          },
        },
      });
    }
  };

  return (
    <FormControl id={id} sx={{ p: 2 }}>
      <Typography variant="subtitle1">{title}</Typography>
      <RadioGroup value={selected} onChange={handleChange}>
        {options.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export type SingleChoiceType = ReturnType<typeof SingleChoice>;

export default React.memo(SingleChoice);
