import React, { useEffect, useState } from 'react';
import { apiService } from 'services';
import { useQuery } from 'react-query';
import { useSearchParams, createSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { Paginator, Loading, Checkboxes, Button, List, Section } from 'components/common';
import { CHECKBOXES } from '../Collection/discogsConstants';
import { COLORS } from 'styles';
import styled from 'styled-components';

const filterWidth = 40;
const filtersClosed = `translateX(-${filterWidth + 4}rem)`;
const filtersOpen = `translateX(0rem))`;

import {
  StyledWrapper,
  StyledTitle,
  StyledListWrapper
} from 'views/StyledComponents/listViewWrappers';

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  input {
    margin: 0 1rem;
  }
`;

const Filters = styled.form`
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${COLORS.eggshell};
  height: 100%;
  width: ${filterWidth}rem;
  transform: ${(props) => (props.showFilters ? filtersOpen : filtersClosed)};
  transition: transform 0.3s ease-in-out;
  z-index: 3;
`;

const FilterCheckboxWrapper = styled.div`
  display: flex;
  color: ${COLORS.darkerGray};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(238, 225, 225);
  z-index: 2;
  opacity: ${(props) => (props.showFilters ? 0.5 : 0)};
  pointer-events: ${(props) => (props.showFilters ? 'unset' : 'none')};
  transition: opacity 0.2s linear;
  cursor: pointer;
`;

const SearchRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
    return _.reduce(
      DEFAULT_PARAMS,
      (result, _, key) => {
        const value = params.get(key);

        // if (isArray(DEFAULT_PARAMS[key]) && value) {
        //   DEFAULT_PARAMS[key].push(value)
        // }

        if (value) {
          result[key] = value;
        }

        return result;
      },
      {}
    );
  };

  useEffect(() => {
    setParamCollector({
      page: params.get('page') || 1,
      genre: params.getAll('genre') || [],
      style: params.getAll('style') || [],
      type: params.get('type') || 'release',
      q: params.get('q') || '',
      sort: params.get('sort') || 'nfm'
    });
  }, []);

  const {
    isLoading,
    error,
    data: search,
    isFetching,
    isPreviousData
  } = useQuery(
    [
      'search',
      params.get('page'),
      params.getAll('genre'),
      params.getAll('style'),
      params.get('type'),
      params.get('q')
    ],
    () =>
      apiService.request({
        route: 'discogs/search',
        params: { ...paramCollector, format: 'vinyl' }
      }),
    { keepPreviousData: true }
  );

  const onParamCollector = ({ key, value }) => {
    setParamCollector((currentValues) => {
      return {
        ...currentValues,
        [key]: value
      };
    });

    if (key === 'page') {
      setParams({ ...paramCollector, page: value });
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
      return <Loading spinnerClassName="vinyl" spinnerSize={60} position="relative" />;
    }

    const { results } = search;

    const formatedResults = results.map((result) => {
      return { basic_information: { ...result } };
    });

    return <List items={formatedResults || []} />;
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
            idx + 1 === values.length ? value.substring(0, value.length - 2) : value;

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
    <Section>
      <StyledWrapper>
        <Filters showFilters={showFilters} onSubmit={onSearchSubmit}>
          <FilterCheckboxWrapper>
            {CHECKBOXES.map(({ key, values, label }) => {
              return (
                <Checkboxes
                  key={key}
                  label={label}
                  items={values}
                  onChange={({ value }) => {
                    onParamCollector({ key, value });
                  }}
                  parentState={paramCollector[key]}
                />
              );
            })}
          </FilterCheckboxWrapper>
          <Button type="submit">Go!</Button>
        </Filters>
        <SearchRow>
          <TitleGroup>
            <StyledTitle>Search</StyledTitle>
            <form onSubmit={onSearchSubmit}>
              <input
                type="search"
                value={paramCollector.q}
                onChange={({ target: { value } }) => {
                  onParamCollector({ key: 'q', value });
                }}
              />
              <Button type="submit" className="control">
                Go!
              </Button>
            </form>
          </TitleGroup>
          <div>{renderFilterStatus()}</div>
        </SearchRow>
        <StyledListWrapper>{renderSearch()}</StyledListWrapper>
        <Paginator
          pagination={
            search?.pagination ?? {
              page: 1,
              items: 100,
              pages: 2,
              per_page: 50
            }
          }
          changePage={(page) => {
            onParamCollector({
              key: 'page',
              value: page
            });
          }}
        />
        <Overlay showFilters={showFilters} onClick={onFiltersDismiss} />
      </StyledWrapper>
    </Section>
  );
};

export default Search;
