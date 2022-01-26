import React, { useState, useEffect } from 'react';
import { apiService } from 'services';
import { useQuery } from 'react-query'
import { useSearchParams } from "react-router-dom";
import { Section, Paginator, Select, Loading, List } from 'components/common';
import './collection.scss';

const Collection = () => {
    const [params, setParams] = useSearchParams();

    const { data: folders } = useQuery('folders', () =>
        apiService.request({
            route: 'discogs/folders'
        }), { keepPreviousData: true }
    )

    const { isLoading, data: collection, isFetching, isPreviousData } = useQuery(['collection', params.get('page'), params.get('folder')], () =>
        apiService.request({
            route: 'discogs/collection',
            params: {
                page: params.get('page'),
                folder: params.get('folder')
            },
        }), { keepPreviousData: true }
    )

    const onFolderChange = (value) => {
        setParams({
            page: 1,
            folder: value
        });
    };

    const onPageChange = (value) => {
        setParams({
            folder: params.get('folder'),
            page: value,
        });
    };

    const renderSelect = () => {
        return (
            <Select
                onChange={onFolderChange}
                values={folders?.folders ?? [
                    { id: 0, name: '         ', count: 0 }
                ]}
                disabled={isLoading}
                selectedValue={params.get('folder') ?? 0}
            />
        );
    };

    const renderCollection = () => {
        if (isLoading || (isFetching && isPreviousData)) {
            return (
                <Loading
                    spinnerClassName="loading-vinyl"
                    spinnerSize={60}
                    position="relative"
                />
            );
        }

        const { releases } = collection;

        return <List items={releases} />;
    };

    return (
        <Section
            bgColor="eggshell"
            minHeight={520}
        >
            <div className="wrapper">
                <div className="title-group">
                    <h3>Collection</h3>
                    <div>{renderSelect()}</div>
                </div>
                <div className="list-wrapper">{renderCollection()}</div>
                <Paginator
                    pagination={collection?.pagination ?? {
                        page: 1,
                        items: 100,
                        pages: 2,
                        per_page: 50
                    }}
                    changePage={onPageChange}
                    isLoading={isLoading}
                />
            </div>
        </Section>
    );
};

export default Collection;
