import { Box, Typography, TextField } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import {
  useSelectedFiltersDispatch,
  useSelectedFiltersState,
} from '../../hooks';
import Actions from '../../const';

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
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>

      <TextField
        id={id}
        fullWidth
        variant="outlined"
        size="small"
        value={value}
        onChange={handleChange}
        placeholder={`Введите ${title.toLowerCase()}`}
      />
    </Box>
  );
}

export type FilterTextFieldType = ReturnType<typeof FilterTextField>;

export default React.memo(FilterTextField);
