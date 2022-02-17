import _ from 'lodash';
import { Button } from '..';
import { COLORS, FONT_WEIGHTS } from 'styles';
import { generateArrayOfNumbers } from 'helpers';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Icon = styled.i`
  font-size: 1.5rem;
  font-weight: ${FONT_WEIGHTS.bold};
  margin-right: 0.5rem;
  padding-left: 0.5rem;
`;

const PaginatorButton = styled(Button)`
  border-radius: 1.3rem;
  font-size: 1.4rem;
  height: 2.6rem;
  margin-right: 0.5rem;
  padding: 0.3rem ${(props) => props.paddingHorizontal || 1.6}rem;
  /* width: ${(props) => (props.small ? 4 : 5.7)}rem; */
`;

const PaginatorContainer = styled.div`
  color: ${COLORS.darkerGray};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Mono', sans-serif;
  font-weight: ${FONT_WEIGHTS.semiBold};
  padding-top: 1rem;
`;

const PaginatorControls = styled.div`
  align-items: flex-end;
  display: flex;
  margin: 0.6rem 0;
`;

const PAGES_BEFORE_AND_AFTER_CURRENT = 3;

const Paginator = ({ pagination, changePage, isLoading }) => {
  const { page, pages } = pagination;

  const [pageArray, setPageArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
    setPageArray(generateArrayOfNumbers({ length: pages }));
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
      <PaginatorButton
        small
        className="paginator-button"
        paddingHorizontal={0.5}
        onClick={() => {
          onClick({
            page: isLeftArrow ? currentPage - 1 : currentPage + 1
          });
        }}
        disabled={disabled || isLoading}
      >
        <Icon className={className} />
      </PaginatorButton>
    );
  };

  const renderPageButton = ({ pageNumber }) => {
    const isCurrentPage = pageNumber === currentPage;

    return (
      <PaginatorButton
        className="paginator-button"
        key={pageNumber}
        onClick={() => {
          onClick({
            page: pageNumber
          });
        }}
        disabled={isCurrentPage || isLoading}
      >
        {pageNumber}
      </PaginatorButton>
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
            {hasFirstEllipsis() && <Icon className="fal fa-ellipsis-h" leftMargin />}
            {getCenterPages().map((pageNumber) => renderPageButton({ pageNumber }))}
            {hasLastEllipsis() && <Icon className="fal fa-ellipsis-h" leftMargin />}
            {hasLast() && renderPageButton({ pageNumber: pages })}
          </>
        )}
      </>
    );
  };

  const numberToLocalString = ({ number }) => {
    return number.toLocaleString('en-US');
  };

  const renderStatus = () => {
    const { per_page: perPage, items } = pagination;

    const isLastPage = page === pages;
    const start = perPage * (page - 1) + 1;
    let end = !isLastPage ? perPage * page : items;
    const highestPossibleCount = 10000;

    if (items > highestPossibleCount && isLastPage) {
      end = highestPossibleCount;
    }

    return (
      <span>
        {`${numberToLocalString({ number: start })}->${numberToLocalString({
          number: end
        })} of ${numberToLocalString({ number: items })}`}
      </span>
    );
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
