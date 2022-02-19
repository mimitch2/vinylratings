import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { apiService } from 'services';
import { Paginator, Loading, Section, List } from 'components/common';
import {
  StyledWrapper,
  StyledTitle,
  StyledListWrapper
} from 'views/StyledComponents/listViewWrappers';

const WantList = () => {
  const [page, setPage] = useState(1);

  const {
    isLoading,
    error,
    data: wantList,
    isFetching,
    isPreviousData
  } = useQuery(
    ['wantlist', page],
    () =>
      apiService.request({
        route: 'discogs/wantlist'
      }),
    { keepPreviousData: true }
  );

  const renderWantList = () => {
    if (isLoading || (isFetching && isPreviousData)) {
      return <Loading spinnerClassName="vinyl" spinnerSize={60} position="relative" />;
    }

    const { wants } = wantList;

    return <List items={wants || []} />;
  };

  return (
    <Section>
      <StyledWrapper>
        <StyledTitle>Wants</StyledTitle>
        <StyledListWrapper>{renderWantList()}</StyledListWrapper>
        <Paginator
          pagination={
            wantList?.pagination ?? {
              page: 1,
              items: 100,
              pages: 2,
              per_page: 50
            }
          }
          changePage={setPage}
        />
      </StyledWrapper>
    </Section>
  );
};

export default WantList;
