import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import '../discogs.scss';
import { DiscogsList } from '.';
import { Paginator, Loading, Checkboxes, Button } from 'components/common';
import { CHECKBOXES } from '../discogsConstants';

const DiscogsSearch = ({
    setParamCollector,
    setDiscogsSearchPage,
    setShowFilters,
    setParams,
    paramCollector,
    isLoading,
    discogsSearch,
    params,
    showFilters
}) => {
    const onParamCollector = ({ key, value }) => {
        setParamCollector((currentValues) => {
            return {
                ...currentValues,
                [key]: value
            };
        });
    };

    const onSearchPageChange = (value) => {
        onParamCollector({ key: 'page', value });
        setDiscogsSearchPage(value);
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setShowFilters(false);
        setParams(paramCollector);
    };

    const onFiltersDismiss = () => {
        setShowFilters(false);
        setParamCollector(params);
    };

    const getFilterStatusValues = () => {
        const filtersToShow = ['genre', 'style', 'format'];

        return _.reduce(
            params,
            (result, val, key) => {
                if (filtersToShow.includes(key)) {
                    if (_.isArray(val) && val.length) {
                        const joinedValue = val.join(', ');

                        result.push({
                            param: `${key}`,
                            value: `: ${joinedValue} & `
                        });
                    }

                    if (!_.isArray(val) && val) {
                        result.push({
                            param: `${key}`,
                            value: `: ${val} & `
                        });
                    }
                }
                return result;
            },

            []
        );
    };

    const renderSearch = () => {
        if (isLoading) {
            return (
                <Loading
                    spinnerClassName="loading-vinyl"
                    spinnerSize={60}
                    position="relative"
                />
            );
        }

        const { results } = discogsSearch;

        const formatedResults = results.map((result) => {
            return { basic_information: { ...result } };
        });

        return <DiscogsList items={formatedResults} />;
    };

    const renderFilterStatus = () => {
        const values = getFilterStatusValues();

        return (
            <button
                className="control"
                onClick={() => {
                    setShowFilters(true);
                }}
            >
                {_.map(values, ({ param, value }, idx) => {
                    const realValue =
                        idx + 1 === values.length
                            ? value.substring(0, value.length - 2)
                            : value;

                    return (
                        <span key={param}>
                            <strong>{param}</strong>
                            <span>{realValue}</span>
                        </span>
                    );
                })}
            </button>
        );
    };

    return (
        <div className="discogs-wrapper">
            <form
                className={`discogs-filters${showFilters ? ' active' : ''}`}
                onSubmit={onSearchSubmit}
            >
                <div className="discogs-filters-checkboxs">
                    {CHECKBOXES.map(({ key, values, label }) => {
                        return (
                            <Checkboxes
                                key={key}
                                label={label}
                                items={values}
                                onChange={({ value }) => {
                                    onParamCollector({
                                        key,
                                        value
                                    });
                                }}
                                parentState={paramCollector[key]}
                            />
                        );
                    })}
                </div>
                <Button type="submit" />
            </form>
            <div className="discogs-search">
                <div className="discogs-title-group">
                    <h3>Search</h3>
                    <form onSubmit={onSearchSubmit}>
                        <input
                            type="search"
                            value={paramCollector.q}
                            onChange={({ target: { value } }) => {
                                onParamCollector({
                                    key: 'q',
                                    value
                                });
                            }}
                        />
                        <button type="submit" className="control">
                            Go!
                        </button>
                    </form>
                </div>
                <div>{renderFilterStatus()}</div>
            </div>
            <div className="discogs-list-wrapper">{renderSearch()}</div>
            <Paginator
                pagination={discogsSearch.pagination}
                changePage={onSearchPageChange}
            />
            <div
                className={`discogs-overlay${showFilters ? ' active' : ''}`}
                onClick={onFiltersDismiss}
            />
        </div>
    );
};

DiscogsSearch.propTypes = {
    discogsSearch: PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape).isRequired
    }).isRequired,
    setDiscogsSearchPage: PropTypes.func.isRequired,
    setShowFilters: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    paramCollector: PropTypes.shape({}),
    params: PropTypes.shape({}),
    showFilters: PropTypes.bool,
    isLoading: PropTypes.bool
};

DiscogsSearch.defaultProps = {
    isLoading: false
};

export default DiscogsSearch;
