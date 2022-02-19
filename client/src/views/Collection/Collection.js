import React, { useEffect } from 'react';
import { apiService } from 'services';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Section, Paginator, Select, Loading, List } from 'components/common';
import styled from 'styled-components';
import {
  StyledWrapper,
  StyledTitle,
  StyledListWrapper
} from 'views/StyledComponents/listViewWrappers';

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  select {
    margin-left: 1rem;
  }
`;

const Collection = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    setParams({
      page: params.get('page') ?? 1,
      folder: params.get('folder') ?? 0
    });
  }, []);

  const { data: folders, error: foldersError } = useQuery(
    'folders',
    () =>
      apiService.request({
        route: 'discogs/folders'
      }),
    { keepPreviousData: true }
  );

  const {
    isLoading,
    data: collection,
    error: collectionError,
    isFetching,
    isPreviousData
  } = useQuery(
    ['collection', params.get('page'), params.get('folder')],
    () =>
      apiService.request({
        route: 'discogs/collection',
        params: {
          page: params.get('page'),
          folder: params.get('folder')
        }
      }),
    { keepPreviousData: true }
  );

  const onFolderChange = (value) => {
    setParams({
      page: 1,
      folder: value
    });
  };

  const onPageChange = (value) => {
    setParams({
      folder: params.get('folder'),
      page: value
    });
  };

  const renderSelect = () => {
    return (
      <Select
        onChange={onFolderChange}
        values={folders?.folders ?? [{ id: 0, name: '         ', count: 0 }]}
        disabled={isLoading}
        selectedValue={params.get('folder') ?? 0}
      />
    );
  };

  const renderCollection = () => {
    if (isLoading || (isFetching && isPreviousData)) {
      return <Loading spinnerClassName="vinyl" spinnerSize={60} position="relative" />;
    }

    const { releases } = collection;

    return <List items={releases || []} />;
  };

  return (
    <Section>
      <StyledWrapper>
        <TitleGroup>
          <StyledTitle>Collection</StyledTitle>
          {renderSelect()}
        </TitleGroup>
        <StyledListWrapper>{renderCollection()}</StyledListWrapper>
        <Paginator
          pagination={
            collection?.pagination ?? {
              page: 1,
              items: 100,
              pages: 2,
              per_page: 50
            }
          }
          changePage={onPageChange}
          isLoading={isLoading}
        />
      </StyledWrapper>
    </Section>
  );
};

export default Collection;
