import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ticket_system_page_size';
const DEFAULT_PAGE_SIZE = 20;

export function usePageSize() {
  const [pageSize, setPageSizeState] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed) && parsed > 0) return parsed;
    }
    return DEFAULT_PAGE_SIZE;
  });

  const setPageSize = useCallback((size: number) => {
    localStorage.setItem(STORAGE_KEY, String(size));
    setPageSizeState(size);
  }, []);

  return [pageSize, setPageSize] as const;
}
