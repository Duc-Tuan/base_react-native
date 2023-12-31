import { useCallback, useEffect, useState } from 'react';

const useFetchData = <T>(callback: (page: number) => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNoLoading = useCallback(async () => {
    try {
      const response = await callback(1);
      setData(response);
      return response;
    } catch (error) {}
  }, [callback]);

  const fetchDefaul = useCallback(
    async (refresh?: boolean) => {
      refresh ? setRefreshing(true) : setLoading(true);
      try {
        await fetchNoLoading();
      } catch (error) {
      } finally {
        refresh ? setRefreshing(false) : setLoading(false);
      }
    },
    [fetchNoLoading],
  );

  const onRefresh = useCallback(async () => {
    await fetchDefaul(true);
  }, [fetchDefaul]);

  useEffect(() => {
    fetchDefaul();
  }, [fetchDefaul]);

  return { fetchDefaul, onRefresh, data, refreshing, loading, setData, fetchNoLoading, setLoading };
};

export default useFetchData;
