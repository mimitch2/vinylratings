import React from 'react';
import PropTypes from 'prop-types';
import '../collection.scss';
import { List } from 'components/common';
import { Paginator, Loading } from 'components/common';

const DiscogsWantList = ({
    discogsWantList,
    setDiscogsWantListPage,
    isLoading
}) => {
    const renderWantList = () => {
        if (isLoading) {
            return (
                <Loading
                    spinnerClassName="loading-vinyl"
                    spinnerSize={60}
                    position="relative"
                />
            );
        }

        const { wants } = discogsWantList;

        return <List items={wants} />;
    };

    return (
        <div className="discogs-wrapper">
            <h3>Want List</h3>
            <div className="discogs-list-wrapper">{renderWantList()}</div>
            <Paginator
                pagination={discogsWantList.pagination}
                changePage={setDiscogsWantListPage}
            />
        </div>
    );
};

DiscogsWantList.propTypes = {
    discogsWantList: PropTypes.shape({
        wants: PropTypes.arrayOf(PropTypes.shape).isRequired
    }).isRequired,
    setDiscogsWantListPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

DiscogsWantList.defaultProps = {
    isLoading: false
};

export default DiscogsWantList;
