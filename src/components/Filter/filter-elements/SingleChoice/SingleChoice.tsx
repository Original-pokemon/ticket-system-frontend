import React from 'react';
import { FilterSectionType } from '../../types';
import {
  useSelectedFiltersDispatch,
  useSelectedFiltersState,
} from '../../hooks';
import Actions from '../../const';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

  const handleChange = (selectedValue: string) => {
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
    <div id={id} className="p-4">
      <Label className="font-medium mb-3 block">{title}</Label>
      <RadioGroup value={selected} onValueChange={handleChange}>
        <div className="space-y-2">
          {options.map(({ label, value }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`${id}-${value}`} />
              <Label
                htmlFor={`${id}-${value}`}
                className="font-normal cursor-pointer"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

export type SingleChoiceType = ReturnType<typeof SingleChoice>;

export default React.memo(SingleChoice);
