import React, { useState } from 'react';
import { apiService } from 'services';
import { useQuery } from 'react-query'
import { Section, Paginator, Select, Loading, List } from 'components/common';
import './collection.scss';

const Discogs = () => {
    // general
    // const [showFilters, setShowFilters] = useState(false);
    // const [currentTab, setCurrentTab] = useState(1);
    const [page, setPage] = useState(1);
    const [folder, setFolder] = useState(0);

    const { isLoading: foldersLoading, error: foldersError, data: folders } = useQuery('folders', () =>
        apiService.request({
            route: 'discogs/folders'
        }), { keepPreviousData: true }
    )

    const { isLoading, error, data: collection, isFetching, isPreviousData } = useQuery(['collection', page, folder], () =>
        apiService.request({
            route: 'discogs/collection',
            params: { folder, page }
        }), { keepPreviousData: true }
    )

    // // folders
    // const [
    //     {
    //         fetchedData: discogsFolders,
    //         isLoading: foldersLoading,
    //         error: foldersError
    //     },
    //     setFolders
    // ] = useApiService({
    //     route: 'discogs/folders'
    // });

    // collection

    // const [
    //     {
    //         fetchedData: discogsCollection,
    //         isLoading,
    //         error: collectionError
    //     },
    //     setDiscogsCollection
    // ] = useApiService({
    //     route: 'discogs/collection',
    //     params: { folder: discogsFolder, page: discogsCollectionPage },
    //     dependencies: [discogsFolder, discogsCollectionPage]
    // });

    // // want list
    // const [discogsWantListPage, setDiscogsWantListPage] = useState(1);
    // const [
    //     {
    //         fetchedData: discogsWantList,
    //         isLoading: wantListLoading,
    //         error: wantListError
    //     },
    //     setDiscogsWantList
    // ] = useApiService({
    //     route: 'discogs/wantlist',
    //     dependencies: [discogsWantListPage]
    // });

    // // search
    // const [discogsSearchPage, setDiscogsSearchPage] = useState(1);
    // const DEFAULT_PARAMS = {
    //     page: discogsSearchPage,
    //     genre: [],
    //     style: ['indie+rock'],
    //     type: 'release',
    //     artist: '',
    //     sort: 'nfm',
    //     q: '',
    //     format: 'vinyl'
    // };
    // const [paramCollector, setParamCollector] = useState(DEFAULT_PARAMS);
    // const [params, setParams] = useState(DEFAULT_PARAMS);
    // const [
    //     {
    //         fetchedData: discogsSearch,
    //         isLoading: searchLoading,
    //         error: searchError
    //     }
    //     // setSearch
    // ] = useApiService({
    //     route: 'discogs/search',
    //     params,
    //     dependencies: [params]
    // });

    // useEffect(() => {
    //     setParams(paramCollector);
    // }, [discogsSearchPage]);

    const onFolderChange = (value) => {
        setPage(1);
        setFolder(value);
    };

    const renderSelect = () => {
        return (
            <Select
                onChange={onFolderChange}
                values={folders?.folders ?? [
                    { id: 0, name: '         ', count: 0 }
                ]}
                disabled={isLoading}
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
            <div>
                <div className="discogs-wrapper">
                    <div className="discogs-title-group">
                        <h3>Collection</h3>
                        <div>{renderSelect()}</div>
                    </div>
                    <div className="discogs-list-wrapper">{renderCollection()}</div>
                    <Paginator
                        pagination={collection?.pagination ?? {
                            page: 1,
                            items: 100,
                            pages: 2,
                            per_page: 50
                        }}
                        changePage={setPage}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* {currentTab == 2 && (
                <DiscogsWantList
                    discogsWantList={discogsWantList}
                    setDiscogsWantListPage={setDiscogsWantListPage}
                    isLoading={wantListLoading}
                />
            )}

            {currentTab == 3 && (
                <DiscogsSearch
                    setParamCollector={setParamCollector}
                    setDiscogsSearchPage={setDiscogsSearchPage}
                    setShowFilters={setShowFilters}
                    setParams={setParams}
                    paramCollector={paramCollector}
                    isLoading={searchLoading}
                    discogsSearch={discogsSearch}
                    params={params}
                    showFilters={showFilters}
                />
            )} */}
        </Section>
    );
};

export default Discogs;
