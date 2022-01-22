import React, { useState, useEffect } from 'react';
import { useApiService } from 'services';
import { Section, Paginator, Select, Loading } from 'components/common';
import { DiscogsList } from './components';
import './collection.scss';
import {
    DiscogsCollection,
    DiscogsWantList,
    DiscogsSearch
} from './components';

const Discogs = () => {
    // general
    // const [showFilters, setShowFilters] = useState(false);
    // const [currentTab, setCurrentTab] = useState(1);

    // folders
    const [
        {
            fetchedData: discogsFolders,
            isLoading: foldersLoading,
            error: foldersError
        },
        setFolders
    ] = useApiService({
        route: 'discogs/folders'
    });

    // collection
    const [discogsCollectionPage, setDiscogsCollectionPage] = useState(1);
    const [discogsFolder, setDiscogsFolder] = useState(0);
    const [
        {
            fetchedData: discogsCollection,
            isLoading,
            error: collectionError
        },
        setDiscogsCollection
    ] = useApiService({
        route: 'discogs/collection',
        params: { folder: discogsFolder, page: discogsCollectionPage },
        dependencies: [discogsFolder, discogsCollectionPage]
    });

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
        setDiscogsCollectionPage(1);
        setDiscogsFolder(value);
    };

    const renderSelect = () => {
        const { folders } = discogsFolders;

        return (
            <Select
                onChange={onFolderChange}
                values={folders}
                disabled={isLoading}
            />
        );
    };

    const renderCollection = () => {
        if (isLoading) {
            return (
                <Loading
                    spinnerClassName="loading-vinyl"
                    spinnerSize={60}
                    position="relative"
                />
            );
        }

        const { releases } = discogsCollection;

        return <DiscogsList items={releases} />;
    };

    // return (
    //     <div className="discogs-wrapper">
    //         <div className="discogs-title-group">
    //             <h3>Collection</h3>
    //             <div>{renderSelect()}</div>
    //         </div>
    //         <div className="discogs-list-wrapper">{renderCollection()}</div>
    //         <Paginator
    //             pagination={discogsCollection.pagination}
    //             changePage={setDiscogsCollectionPage}
    //             isLoading={isLoading}
    //         />
    //     </div>
    // );

    return (
        <Section
            bgColor="eggshell"
            minHeight={520}
        >
            <div>
                {discogsFolders && discogsCollection && (
                    <div className="discogs-wrapper">
                        <div className="discogs-title-group">
                            <h3>Collection</h3>
                            <div>{renderSelect()}</div>
                        </div>
                        <div className="discogs-list-wrapper">{renderCollection()}</div>
                        <Paginator
                            pagination={discogsCollection.pagination}
                            changePage={setDiscogsCollectionPage}
                            isLoading={isLoading}
                        />
                    </div>

                )}
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
