import React, { useState } from 'react';
import { useQuery } from 'react-query'
import { apiService } from 'services';
import '../Collection/collection.scss';
import { Paginator, Loading, Section, List } from 'components/common';

const WantList = () => {
  const [page, setPage] = useState(1);

  const { isLoading, error, data: wantList, isFetching, isPreviousData } = useQuery(['wantlist', page], () =>
    apiService.request({
      route: 'discogs/wantlist'
    }), { keepPreviousData: true }
  )

  const renderWantList = () => {
    if (isLoading || (isFetching && isPreviousData)) {
      return (
        <Loading
          spinnerClassName="loading-vinyl"
          spinnerSize={60}
          position="relative"
        />
      );
    }

    const { wants } = wantList;

    return <List items={wants || []} />;
  };

  return (
    <Section
      bgColor="eggshell"
      minHeight={520}
    >
      <div className="wrapper">
        <h3>Wants</h3>
        <div className="list-wrapper">{renderWantList()}</div>
        <Paginator
          pagination={wantList?.pagination ?? {
            page: 1,
            items: 100,
            pages: 2,
            per_page: 50
          }}
          changePage={setPage}
        />
      </div>
    </Section>
  );
};

export default WantList;
