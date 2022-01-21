import React, { useState, useEffect } from 'react';
import { useApiService } from 'services';
import { Section } from 'components/common';
import './discogs.scss';
import discogsLogo from 'images/discogs-logo.svg';
import {
    DiscogsCollection,
    DiscogsWantList,
    DiscogsSearch
} from './components';
import { TABS } from './discogsConstants';

const Discogs = () => {
    // general
    const [showFilters, setShowFilters] = useState(false);
    const [currentTab, setCurrentTab] = useState(1);

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
            isLoading: collectionLoading,
            error: collectionError
        },
        setDiscogsCollection
    ] = useApiService({
        route: 'discogs/collection',
        params: { folder: discogsFolder, page: discogsCollectionPage },
        dependencies: [discogsFolder, discogsCollectionPage]
    });

    // want list
    const [discogsWantListPage, setDiscogsWantListPage] = useState(1);
    const [
        {
            fetchedData: discogsWantList,
            isLoading: wantListLoading,
            error: wantListError
        },
        setDiscogsWantList
    ] = useApiService({
        route: 'discogs/wantlist',
        dependencies: [discogsWantListPage]
    });

    // search
    const [discogsSearchPage, setDiscogsSearchPage] = useState(1);
    const DEFAULT_PARAMS = {
        page: discogsSearchPage,
        genre: [],
        style: ['indie+rock'],
        type: 'release',
        artist: '',
        sort: 'nfm',
        q: '',
        format: 'vinyl'
    };
    const [paramCollector, setParamCollector] = useState(DEFAULT_PARAMS);
    const [params, setParams] = useState(DEFAULT_PARAMS);
    const [
        {
            fetchedData: discogsSearch,
            isLoading: searchLoading,
            error: searchError
        }
        // setSearch
    ] = useApiService({
        route: 'discogs/search',
        params,
        dependencies: [params]
    });

    useEffect(() => {
        setParams(paramCollector);
    }, [discogsSearchPage]);

    return (
        <Section
            bgColor="eggshell"
            tabs={TABS}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            logo={discogsLogo}
            minHeight={520}
        >
            <div>
                {currentTab === 1 && discogsFolders && discogsCollection && (
                    <DiscogsCollection
                        discogsCollection={discogsCollection}
                        setDiscogsCollectionPage={setDiscogsCollectionPage}
                        isLoading={collectionLoading}
                        discogsFolders={discogsFolders}
                        setDiscogsFolder={setDiscogsFolder}
                    />
                )}
            </div>

            {currentTab == 2 && (
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
            )}
        </Section>
    );
};

export default Discogs;
