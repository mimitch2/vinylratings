import React, { useEffect, useState } from 'react';
import { apiService } from 'services';
import { useQuery } from 'react-query'
import { useSearchParams } from "react-router-dom";
import _ from 'lodash';
import '../Collection/collection.scss';
import { Paginator, Loading, Checkboxes, Button, List, Section } from 'components/common';
import { CHECKBOXES } from '../Collection/discogsConstants';

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const DEFAULT_PARAMS = {
    page,
    genre: [],
    style: ["indie+rock", "indie+pop"],
    type: 'release',
    sort: 'nfm',
    q: '',
    format: 'vinyl'
  };
  const [paramCollector, setParamCollector] = useState(DEFAULT_PARAMS);
  const [params, setParams] = useSearchParams();
  // let [searchParams, setSearchParams] = useSearchParams();


  const { isLoading, error, data: search, isFetching, isPreviousData } = useQuery(['search', params], () =>
    apiService.request({
      route: 'discogs/search',
      params: paramCollector,
    }), { keepPreviousData: true }
  )

  useEffect(() => {
    setParams(paramCollector);
  }, [paramCollector, page]);

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
    setPage(value);
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
      paramCollector,
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
    if (isLoading || (isFetching && isPreviousData)) {
      return (
        <Loading
          spinnerClassName="loading-vinyl"
          spinnerSize={60}
          position="relative"
        />
      );
    }

    const { results } = search;

    const formatedResults = results.map((result) => {
      return { basic_information: { ...result } };
    });

    return <List items={formatedResults} />;
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
    <Section
      bgColor="eggshell"
      minHeight={520}
    >
      <div className="wrapper">
        <form
          className={`filters${showFilters ? ' active' : ''}`}
          onSubmit={onSearchSubmit}
        >
          <div className="filters-checkboxs">
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
          <Button type="submit">
            Go!
          </Button>
        </form>
        <div className="search">
          <div className="title-group">
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
              <Button
                type="submit"
                className="control"
              >
                Go!
              </Button>
            </form>
          </div>
          <div>{renderFilterStatus()}</div>
        </div>
        <div className="list-wrapper">{renderSearch()}</div>
        <Paginator
          pagination={search?.pagination ?? {
            page: 1,
            items: 100,
            pages: 2,
            per_page: 50
          }}
          changePage={onSearchPageChange}
        />
        <div
          className={`overlay${showFilters ? ' active' : ''}`}
          onClick={onFiltersDismiss}
        />
      </div>
    </Section>
  );
};

export default Search;
