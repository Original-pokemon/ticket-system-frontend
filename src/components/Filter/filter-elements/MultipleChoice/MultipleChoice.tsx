import React from 'react';
import { FilterSectionType } from '../../types';
import {
  useSelectedFiltersDispatch,
  useSelectedFiltersState,
} from '../../hooks';
import Actions from '../../const';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

function MultipleChoice({ id, title, options }: FilterSectionType) {
  const selectedFilters = useSelectedFiltersState();
  const dispatch = useSelectedFiltersDispatch();

  const handleChange = (checked: boolean, selectedValue: string) => {
    const isSelected = checked;

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
    <div id={id} className="p-4">
      <Label className="font-medium mb-5 block">{title}</Label>
      <div className="space-y-2">
        {options.map(({ label, value }) => (
          <div key={value} className="flex items-center space-x-2">
            <Checkbox
              id={`${id}-${value}`}
              checked={selectedValuesSet.has(value)}
              onCheckedChange={(checked) => handleChange(checked as boolean, value)}
            />
            <Label
              htmlFor={`${id}-${value}`}
              className="font-normal cursor-pointer"
            >
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export type MultipleChoiceType = ReturnType<typeof MultipleChoice>;

export default React.memo(MultipleChoice);
