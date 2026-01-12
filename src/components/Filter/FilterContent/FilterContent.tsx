import React from 'react';
import FilterHeaderActions from './FilterHeaderActions';
import { useSelectedFiltersDispatch, useSelectedFiltersState } from '../hooks';
import Actions from '../const';
import DataDrawer from '@/components/layouts/data-layouts/DataDrawer/DataDrawer';

type FilterContentProperties = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function FilterContent({ children, open, onClose }: FilterContentProperties) {
  return (
    <DataDrawer open={open} onClose={onClose} direction="left" maxSize="sm" >
      <DataDrawer.Header >
        <DataDrawer.Header.Title>Фильтры</DataDrawer.Header.Title>
      </DataDrawer.Header>

      <DataDrawer.Body>{children}</DataDrawer.Body>
    </DataDrawer>
  );
}

export default React.memo(FilterContent);
