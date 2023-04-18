import React, { useEffect, useState } from 'react';
import type { FlatList } from 'react-native';
import { useLazyQuery, DocumentNode } from '@apollo/client';

import { Pagination, SortOrder, Releases } from 'types';
import { runHapticFeedback } from 'helpers';

const PER_PAGE = 25;
const PAGINATION_DEFAULT = {
    page: 1,
    per_page: PER_PAGE,
    items: 0,
    pages: 0
};

const SORT_ORDER_DEFAULT = 'desc';

type QueriedData = {
    pagination: Pagination;
    results: Releases[] | undefined;
};
interface Data {
    [key: string]: QueriedData;
}

interface Variables {
    page: number;
    per_page: number;
    sort: string;
    sort_order: SortOrder;
    offset: number;
    limit: number;
    type: string;
}

export const useLazyList = ({
    scrollViewRef,
    QUERY,
    queryKey,
    sortDefault = 'added',
    type = 'release'
}: {
    scrollViewRef: React.RefObject<FlatList<Releases>>;
    QUERY: DocumentNode;
    queryKey: string;
    lazy?: boolean;
    sortDefault?: string;
    type?: string;
}) => {
    const [pagination, setPagination] =
        useState<Pagination>(PAGINATION_DEFAULT);
    const [reloading, setReloading] = useState(false);
    const [isSortingOrFiltering, setIsSortingOrFiltering] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [sort, setSort] = useState(sortDefault);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER_DEFAULT);

    useEffect(() => {
        setSort(sortDefault);
    }, [sortDefault]);

    const variables: Variables = {
        page: 1,
        per_page: PER_PAGE,
        sort,
        sort_order: sortOrder,
        offset: 0,
        limit: PER_PAGE,
        type
    };

    const [
        search,
        { called, loading, data, previousData, fetchMore, refetch, error }
    ] = useLazyQuery(QUERY, {
        variables,
        onCompleted: (returnedData: Data) => {
            if (!loadingMore && returnedData?.getSearch?.results?.length) {
                scrollViewRef?.current?.scrollToIndex({
                    index: 0,
                    animated: false
                });
            }

            setPagination(
                returnedData[queryKey]?.pagination ?? PAGINATION_DEFAULT
            );
            setLoadingMore(false);
        },
        onError(err) {
            setLoadingMore(false);
            throw new Error(`useLazyList: ${err}`);
        }
    });

    useEffect(() => {
        const asyncRefresh = async () => {
            setIsSortingOrFiltering(true);
            await refetch();

            setIsSortingOrFiltering(false);
        };

        if (called) {
            asyncRefresh();
        }
    }, [sort, sortOrder, type, refetch, called]);

    const onRefresh = async () => {
        runHapticFeedback();
        setReloading(true);
        setPagination(PAGINATION_DEFAULT);
        await refetch();
        setReloading(false);
    };

    const onLoadMore = async () => {
        if (loadingMore || pagination.page === pagination.pages) {
            return;
        }

        setLoadingMore(true);

        setPagination((prevState) => {
            return {
                ...prevState,
                page: prevState.page + 1
            };
        });

        try {
            await fetchMore({
                variables: {
                    page: pagination.page + 1,
                    offset: pagination.page - 1,
                    limit: pagination.per_page
                }
            });
        } catch (err) {
            setLoadingMore(false);
            throw new Error(`useLazyList-fetchMore: ${err}`);
        }
    };

    return {
        called,
        data,
        error,
        loading,
        loadingMore,
        isSortingOrFiltering,
        onLoadMore,
        onRefresh,
        previousData,
        reloading,
        search,
        setSort,
        setSortOrder,
        sort,
        sortOrder
    };
};
