/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ResponseCommon } from 'types/product-types';

const useFetchDataList = <T>(callback: (page: number) => Promise<ResponseCommon<T>>) => {
    const [data, setData] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [hasNext, setHasNext] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [total, setTotal] = React.useState<number>(0);

    const func = React.useCallback(async () => {
        try {
            setPage(1);
            const response = await callback(1);
            setHasNext(
                Number(response?.paganition?.currentPage || 1) <
                Number(response?.paganition?.totalPage || 1),
            );
            setTotal(Number(response?.paganition?.totalPage) || 0);
            setData(response?.data || []);
        } catch (error) {
            return Promise.reject(error);
        }
    }, [callback]);

    const fetchDefault = React.useCallback(
        async (refresh?: boolean) => {
            refresh ? setRefreshing(true) : setLoading(true);
            try {
                await func();
            } catch (error) {
            } finally {
                refresh ? setRefreshing(false) : setLoading(false);
            }
        },
        [func],
    );

    React.useEffect(() => {
        fetchDefault();
    }, [fetchDefault]);

    const onRefresh = React.useCallback(() => {
        fetchDefault(true);
    }, [fetchDefault]);

    const onEndReached = React.useCallback(async () => {
        try {
            if (hasNext) {
                setPage(page + 1);
                const response = await callback(page + 1);
                setHasNext(
                    Number(response?.paganition?.currentPage || 1) <
                    Number(response?.paganition?.totalPage || 1),
                );
                setData(state => [...state, ...(response?.data || [])]);
            }
        } catch (error) { }
    }, [callback, hasNext, page]);

    return {
        data,
        loading,
        setLoading,
        setRefreshing,
        refreshing,
        hasNext,
        page,
        total,
        onRefresh,
        onFetchNoLoading: func,
        onEndReached,
        fetchDefault,
        setData,
    };
};

export default useFetchDataList;
