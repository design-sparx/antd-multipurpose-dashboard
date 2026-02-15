import { useCallback, useState } from 'react';

type PaginationOptions = {
  initialPage?: number;
  initialPageSize?: number;
  total?: number;
};

type PaginationReturn = {
  pagination: {
    current: number;
    pageSize: number;
    total?: number;
    showSizeChanger: boolean;
    showTotal: (total: number) => string;
    onChange: (page: number, pageSize: number) => void;
  };
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setTotal: (total: number) => void;
  resetPagination: () => void;
};

export function useTablePagination(
  options: PaginationOptions = {}
): PaginationReturn {
  const { initialPage = 1, initialPageSize = 10, total } = options;

  const [current, setCurrent] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalCount, setTotalCount] = useState(total);
  const [loading, setLoading] = useState(false);

  const handlePageChange = useCallback((page: number, size: number) => {
    setCurrent(page);
    setPageSize(size);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrent(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  return {
    pagination: {
      current,
      pageSize,
      total: totalCount,
      showSizeChanger: true,
      showTotal: (total: number) => `Total ${total} items`,
      onChange: handlePageChange,
    },
    loading,
    setLoading,
    setTotal: setTotalCount,
    resetPagination,
  };
}
