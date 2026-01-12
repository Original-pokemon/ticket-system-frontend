import React, { useEffect, useState, useRef } from 'react';
import {
  useSelectedFiltersDispatch,
  useSelectedFiltersState,
} from '../../hooks';
import Actions from '../../const';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type TextFilterComponentProperties = {
  id: string;
  title: string;
  defaultValue: string;
};

const onlyDigits = (value: string) => value.replaceAll(/\D/g, '');

function FilterTextField({
  id,
  title,
  defaultValue = '',
}: TextFilterComponentProperties) {
  const selectedFilters = useSelectedFiltersState();
  const dispatch = useSelectedFiltersDispatch();

  const [value, setValue] = useState(
    selectedFilters[id]?.options[0]?.value || defaultValue,
  );
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (defaultValue.trim() !== '') {
      dispatch({
        type: Actions.ADD_FILTER,
        payload: {
          id,
          filter: {
            title,
            options: [{ label: defaultValue, value: defaultValue }],
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Синхронизация локального состояния с selectedFilters
  useEffect(() => {
    setValue(selectedFilters[id]?.options[0]?.value || '');
  }, [selectedFilters, id, defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = onlyDigits(event.target.value);

    // Debounce обновления selectedFilters
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    setValue(newValue);
    debounceTimeout.current = setTimeout(() => {
      if (newValue.trim() === '') {
        dispatch({
          type: Actions.REMOVE_FILTER,
          payload: {
            id,
          },
        });
      } else {
        dispatch({
          type: Actions.ADD_FILTER,
          payload: {
            id,
            filter: {
              title,
              options: [{ label: newValue, value: newValue }],
            },
          },
        });
      }
    }, 300);
  };

  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="p-4">
      <Label htmlFor={id} className="font-medium mb-2 block">
        {title}
      </Label>

      <Input
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={`Введите ${title.toLowerCase()}`}
      />
    </div>
  );
}


export default React.memo(FilterTextField);
