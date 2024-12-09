import { Box, Stack } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DataListItem,
  DataListItemProps as DataListItemProperties,
} from './DataListItem/DataListItem';
import Spinner from '../../../Spinner/Spinner';

type DataListProperties = {
  items: DataListItemProperties[];
  isLoading: boolean;
  initialItemCount?: number;
  itemsPerBatch?: number;
};

function DataList({
  items,
  isLoading,
  initialItemCount = 10,
  itemsPerBatch = 10,
}: DataListProperties) {
  const [displayedItems, setDisplayedItems] = useState<
    DataListItemProperties[]
  >([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observerReference = useRef<IntersectionObserver | null>(null);
  const lastItemReference = useRef<HTMLDivElement | null>(null);

  const loadMoreItems = useCallback(() => {
    setDisplayedItems((previousItems) => {
      const nextItems = items.slice(0, previousItems.length + itemsPerBatch);
      if (nextItems.length >= items.length) {
        setHasMore(false); // Все элементы загружены
      }
      return nextItems;
    });
  }, [items, itemsPerBatch]);

  useEffect(() => {
    setDisplayedItems(items.slice(0, initialItemCount));
    setHasMore(items.length > initialItemCount);
  }, [items, initialItemCount]);

  useEffect(() => {
    if (observerReference.current) observerReference.current.disconnect();

    observerReference.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadMoreItems();
      }
    });

    if (lastItemReference.current) {
      observerReference.current.observe(lastItemReference.current);
    }

    return () => {
      if (observerReference.current) observerReference.current.disconnect();
    };
  }, [displayedItems, hasMore, isLoading, loadMoreItems]);

  return (
    <Box sx={{ height: '500px', overflowY: 'auto' }}>
      <Stack spacing={2} alignItems="center">
        {displayedItems.map(({ id, header, body }, index) => {
          if (index === displayedItems.length - 1) {
            return (
              <div key={id} ref={lastItemReference}>
                <DataListItem id={id} header={header} body={body} />
              </div>
            );
          }
          return <DataListItem id={id} header={header} body={body} key={id} />;
        })}
        {isLoading && <Spinner fullscreen />}
      </Stack>
    </Box>
  );
}

export default DataList;
