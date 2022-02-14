import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { generateArrayForRating } from 'helpers';
import {
  StyledStarsRow,
  StyledName,
  StyledStars,
  StyledStarWrapper,
  StyledStarFull,
  StyledStarHalf,
  StyledStarBackground
} from './styledStars';

const Rating = ({ rating, name }) => {
  const splitRating = rating.toString().split('.');
  const ratingInteger = +splitRating[0];
  const ratingFractional = splitRating.length === 2 ? +splitRating[1] : null;

  const renderStar = ({ inputRating }) => {
    const shouldRenderFullStar =
      ratingInteger >= inputRating || (ratingInteger + 1 === inputRating && ratingFractional >= 7);

    if (shouldRenderFullStar) {
      return <StyledStarFull />;
    }

    if (
      ratingFractional &&
      ratingFractional >= 3 &&
      ratingFractional <= 7 &&
      ratingInteger === inputRating - 1
    ) {
      return <StyledStarHalf />;
    }

    return <StyledStarBackground />;
  };

  return (
    <StyledStarsRow>
      <StyledName>{_.startCase(name)}</StyledName>
      <StyledStars>
        {generateArrayForRating().map((inputRating) => (
          <StyledStarWrapper key={inputRating}>{renderStar({ inputRating })}</StyledStarWrapper>
        ))}
      </StyledStars>
    </StyledStarsRow>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Rating;
