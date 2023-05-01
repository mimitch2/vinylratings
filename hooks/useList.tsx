import React, { useEffect, useState } from 'react';
import type { FlatList } from 'react-native';
import { GraphQLError } from 'graphql';

import {
    Folder,
    Pagination,
    SortOrder,
    QueryKey,
    Data,
    Variables
} from '../types';
import { runHapticFeedback } from '../helpers';
import { useQuery, DocumentNode } from '@apollo/client';

export const PER_PAGE = 25;
const PAGINATION_DEFAULT = {
    page: 1,
    per_page: PER_PAGE,
    items: 0,
    pages: 0
};
const SORT_ORDER_DEFAULT = 'desc';

export const useList = ({
    scrollViewRef,
    QUERY,
    queryKey,
    folder = null,
    sortDefault = 'added',
    additionalVariables = {}
}: {
    scrollViewRef: React.RefObject<FlatList<any>>;
    QUERY: DocumentNode;
    queryKey: QueryKey;
    folder?: Folder | null;
    sortDefault?: string;
    additionalVariables?: Object;
}) => {
    const [pagination, setPagination] =
        useState<Pagination>(PAGINATION_DEFAULT);
    const [initialLoading, setInitialLoading] = useState(true);
    const [reloading, setReloading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [sort, setSort] = useState(sortDefault);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER_DEFAULT);

    const variables: Variables = {
        ...additionalVariables,
        page: 1,
        per_page: PER_PAGE,
        sort,
        sort_order: sortOrder,
        offset: 0,
        limit: PER_PAGE
    };

    if (folder) {
        variables.folder = folder.id;
    }

    const { data, fetchMore, refetch, error, loading } = useQuery(QUERY, {
        variables,
        // fetchPolicy: 'cache-and-network',
        onCompleted: (returnedData: Data) => {
            setPagination(
                returnedData?.[queryKey]?.pagination ?? PAGINATION_DEFAULT
            );

            setInitialLoading(false);
        },
        onError(err) {
            setInitialLoading(false);
            throw new GraphQLError(`useList-useQuery: ${err}`);
        }
    });

    useEffect(() => {
        const asyncRefresh = async () => {
            await refetch();
            scrollViewRef?.current?.scrollToIndex({
                index: 0,
                animated: false
            });
        };

        asyncRefresh();
    }, [sort, sortOrder, refetch, folder, scrollViewRef]);

    const onRefresh = async () => {
        runHapticFeedback();
        setReloading(true);
        setPagination(PAGINATION_DEFAULT);
        await refetch();
        setReloading(false);
    };

    const onLoadMore = async () => {
        if (
            loadingMore ||
            pagination.page === pagination.pages ||
            !pagination.pages
        ) {
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
            throw new GraphQLError(`useList-refetch: ${err}`);
        } finally {
            setLoadingMore(false);
        }
    };

    return {
        initialLoading,
        loading,
        reloading,
        loadingMore,
        data,
        error,
        sort,
        setSort,
        onRefresh,
        onLoadMore,
        sortOrder,
        setSortOrder
    };
};
