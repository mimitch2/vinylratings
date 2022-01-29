import React, { useEffect, useState } from 'react';
import { apiService } from 'services';
import { useQuery } from 'react-query'
import { useSearchParams, createSearchParams } from "react-router-dom";
import _ from 'lodash';
import '../Collection/collection.scss';
import { Paginator, Loading, Checkboxes, Button, List, Section } from 'components/common';
import { CHECKBOXES } from '../Collection/discogsConstants';

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const DEFAULT_PARAMS = {
    page: 1,
    genre: ['rock', 'jazz'],
    style: [],
    type: 'release',
    sort: 'nfm',
    q: '',
    format: 'vinyl'
  };
  const [paramCollector, setParamCollector] = useState(DEFAULT_PARAMS);
  const [params, setParams] = useSearchParams();
  // Somehow lodash's _.isArray function resolves to undefined when used
  // inside lodash's _.reduce, so just assign it outside of the reduce.
  const isArray = _.isArray;


  const setInitialParams = () => {
    return _.reduce(DEFAULT_PARAMS, (result, _, key) => {
      const value = params.get(key);

      // if (isArray(DEFAULT_PARAMS[key]) && value) {
      //   DEFAULT_PARAMS[key].push(value)
      // }

      if (value) {
        result[key] = value;
      }

      return result;
    }, {})
  };

  useEffect(() => {
    setParamCollector({
      page: params.get('page') || 1,
      genre: params.getAll('genre') || [],
      style: params.getAll('style') || [],
      type: params.get('type') || 'release',
      q: params.get('q') || '',
      sort: params.get('sort') || 'nfm'
    })
  }, []);



  const { isLoading, error, data: search, isFetching, isPreviousData } = useQuery(
    ['search',
      params.get('page'),
      params.getAll('genre'),
      params.getAll('style'),
      params.get('type'),
      params.get('q'),
    ], () =>
    apiService.request({
      route: 'discogs/search',
      params: { ...paramCollector, format: 'vinyl' },
    }), { keepPreviousData: true })


  const onParamCollector = ({ key, value }) => {
    setParamCollector((currentValues) => {
      return {
        ...currentValues,
        [key]: value
      };
    });

    if (key === 'page') {
      setParams({ ...paramCollector, page: value })
    }
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setShowFilters(false);
    setParams(paramCollector);
  };

  const onFiltersDismiss = () => {
    setShowFilters(false);
    setParamCollector({
      page: params.get('page') || 1,
      genre: params.getAll('genre') || [],
      style: params.getAll('style') || [],
      type: params.get('type') || 'release',
      q: params.get('q') || '',
      sort: params.get('sort') || 'nfm'
    });
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
          changePage={(page) => {
            onParamCollector({
              key: 'page', value: page
            })
          }}
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
