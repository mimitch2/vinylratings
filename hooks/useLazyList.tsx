import { useEffect, useState } from 'react';
import { useLazyQuery, DocumentNode } from '@apollo/client';

import { Pagination, SortOrder, Releases, FlashListRef } from 'types';
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
    results: Releases[];
};
interface Data {
    getSearch: QueriedData;
}

interface Variables {
    page?: number;
    per_page?: number;
    sort?: string;
    sort_order?: SortOrder;
    offset?: number;
    limit?: number;
    type?: string;
    search: string;
}

export const useLazyList = ({
    scrollViewRef,
    QUERY,
    sortDefault = 'added',
    type = 'release',
    searchTerm = ''
}: {
    scrollViewRef: FlashListRef;
    QUERY: DocumentNode;
    lazy?: boolean;
    sortDefault?: string;
    type?: string;
    searchTerm?: string;
}) => {
    const [pagination, setPagination] =
        useState<Pagination>(PAGINATION_DEFAULT);
    const [reloading, setReloading] = useState(false);
    const [isSortingOrFiltering, setIsSortingOrFiltering] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [sort, setSort] = useState(sortDefault);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER_DEFAULT);
    const [isTyping, setIsTyping] = useState(false);
    const [data, setData] = useState<Data | undefined>(undefined);

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
        type,
        search: searchTerm
    };

    const [
        search,
        { called, loading, previousData, fetchMore, refetch, error }
    ] = useLazyQuery(QUERY, {
        variables,
        onCompleted: (returnedData: Data) => {
            setData(returnedData);

            if (!loadingMore && returnedData?.getSearch?.results?.length) {
                scrollViewRef?.current?.scrollToIndex({
                    index: 0,
                    animated: false
                });
            }

            setPagination(
                returnedData.getSearch?.pagination ?? PAGINATION_DEFAULT
            );
            setLoadingMore(false);
            setIsTyping(false);
        },
        onError(err) {
            setLoadingMore(false);
            setIsTyping(false);
            throw new Error(`useLazyList: ${err}`);
        }
    });

    useEffect(() => {
        setIsTyping(true);

        const delayDebounceFn = setTimeout(() => {
            const lastCharacter = searchTerm[searchTerm.length - 1];

            if (searchTerm.length && lastCharacter !== ' ') {
                search({ variables: { search: searchTerm } });
            }
        }, 500);

        return () => {
            clearTimeout(delayDebounceFn);
        };
    }, [searchTerm, search]);

    useEffect(() => {
        const asyncRefetch = async () => {
            setIsSortingOrFiltering(true);
            await refetch();

            setIsSortingOrFiltering(false);
        };

        if (called && searchTerm.length) {
            asyncRefetch();
        }
    }, [sort, sortOrder, type, refetch, called, searchTerm]);

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
        sortOrder,
        isTyping
    };
};
