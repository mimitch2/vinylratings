import React from 'react';
import PropTypes from 'prop-types';
import '../discogs.scss';
import { DiscogsList } from './';
import { Paginator, Select, Loading } from 'components/common';

const DiscogsCollection = ({
    discogsFolders,
    setDiscogsFolder,
    discogsCollection,
    setDiscogsCollectionPage,
    isLoading
}) => {
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

    return (
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
    );
};

DiscogsCollection.propTypes = {
    discogsFolders: PropTypes.shape({
        folders: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }).isRequired,
    setDiscogsFolder: PropTypes.func.isRequired,
    discogsCollection: PropTypes.shape({
        releases: PropTypes.arrayOf(PropTypes.shape).isRequired
    }).isRequired,
    setDiscogsCollectionPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

DiscogsCollection.defaultProps = {
    isLoading: false
};

export default DiscogsCollection;
