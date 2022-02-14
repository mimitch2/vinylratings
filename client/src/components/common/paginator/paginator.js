import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../index';
import _ from 'lodash';
import styled from 'styled-components';
import { COLORS, FONT_WEIGHTS } from 'styles';

const PaginatorContainer = styled.div`
  font-family: 'Roboto Mono', sans-serif;
  display: flex;
  flex-direction: column;
  color: ${COLORS.darkerGray};
  font-weight: ${FONT_WEIGHTS.semiBold};
  padding-top: 1rem;
`;

const PaginatorControls = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0.6rem 0;
`;

const Icon = styled.i`
  margin-right: 0.5rem;
`;

const StyledButton = styled(Button)`
  margin-right: 0.5rem;
`;

const PAGES_BEFORE_AND_AFTER_CURRENT = 3;

const Paginator = ({ pagination, changePage, isLoading }) => {
  const { page, pages } = pagination;

  const [pageArray, setPageArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
    setPageArray(
      _.times(pages, (propsPage) => {
        return propsPage + 1;
      })
    );
  }, [page, pages]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages;

  const onClick = ({ page }) => {
    setCurrentPage(page);
    changePage(page);
  };

  const hasFirst = () => {
    return page >= 2 + PAGES_BEFORE_AND_AFTER_CURRENT;
  };

  const hasFirstEllipsis = () => {
    return page >= PAGES_BEFORE_AND_AFTER_CURRENT + 4;
  };

  const hasLast = () => {
    return page <= pages - (1 + PAGES_BEFORE_AND_AFTER_CURRENT);
  };

  const hasLastEllipsis = () => {
    return page < pages - (2 + PAGES_BEFORE_AND_AFTER_CURRENT);
  };

  const getCenterPages = () => {
    let left = Math.max(1, page - PAGES_BEFORE_AND_AFTER_CURRENT);

    if (left - 1 === 2) {
      left--; // Do not show the ellipsis if there is only one to hide
    }

    let right = Math.min(page + PAGES_BEFORE_AND_AFTER_CURRENT, pages);

    if (pages - right === 2) {
      right++; // Do not show the ellipsis if there is only one to hide
    }

    const centerPages = [];

    for (let i = left; i <= right; i++) {
      centerPages.push(i);
    }

    return centerPages;
  };

  const renderArrow = ({ className }) => {
    const isLeftArrow = className === 'far fa-chevron-left';
    const disabled = isLeftArrow ? isFirstPage : isLastPage;

    return (
      <StyledButton
        onClick={() => {
          onClick({
            page: isLeftArrow ? currentPage - 1 : currentPage + 1
          });
        }}
        disabled={disabled || isLoading}
      >
        <Icon className={className} />
      </StyledButton>
    );
  };

  const renderPageButton = ({ pageNumber }) => {
    const isCurrentPage = pageNumber === currentPage;

    return (
      <StyledButton
        key={pageNumber}
        onClick={() => {
          onClick({
            page: pageNumber
          });
        }}
        disabled={isCurrentPage || isLoading}
      >
        {pageNumber}
      </StyledButton>
    );
  };

  const renderPages = () => {
    return (
      <>
        {pages < 10 &&
          pageArray.map((pageNumber) => {
            return renderPageButton({ pageNumber });
          })}

        {pages >= 10 && (
          <>
            {hasFirst() && renderPageButton({ pageNumber: 1 })}
            {hasFirstEllipsis() && <Icon className="fal fa-ellipsis-h" />}
            {getCenterPages().map((pageNumber) => {
              return renderPageButton({ pageNumber });
            })}
            {hasLastEllipsis() && <Icon className="fal fa-ellipsis-h" />}
            {hasLast() && renderPageButton({ pageNumber: pages })}
          </>
        )}
      </>
    );
  };

  const renderStatus = () => {
    const { per_page: perPage, items } = pagination;

    const isLastPage = page === pages;
    const start = perPage * (page - 1) + 1;
    const end = !isLastPage ? perPage * page : items;

    return <span>{`${start}-${end} of ${items.toLocaleString('en-US')}`}</span>;
  };

  return (
    <PaginatorContainer>
      <PaginatorControls>
        {renderArrow({ className: 'far fa-chevron-left' })}
        {renderPages()}
        {renderArrow({ className: 'far fa-chevron-right' })}
      </PaginatorControls>
      {renderStatus()}
    </PaginatorContainer>
  );
};

Paginator.propTypes = {
  pagination: PropTypes.shape({
    items: PropTypes.number,
    page: PropTypes.number,
    pages: PropTypes.number,
    per_page: PropTypes.number
  }).isRequired,
  changePage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

Paginator.defaultProps = {
  isLoading: false
};

export default Paginator;
