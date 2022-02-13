import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './rating.scss';

const Rating = ({ rating, name }) => {
  const splitRating = rating.toString().split('.');
  const ratingInteger = +splitRating[0];
  const ratingFractional = splitRating.length === 2 ? +splitRating[1] : null;

  const getClassName = ({ inputRating }) => {
    const shouldRenderFillStar =
      ratingInteger >= inputRating || (ratingInteger + 1 === inputRating && ratingFractional >= 7);

    if (shouldRenderFillStar) {
      return '';
    }

    if (
      ratingFractional &&
      ratingFractional >= 3 &&
      ratingFractional <= 7 &&
      ratingInteger === inputRating - 1
    ) {
      return 'half';
    }

    return 'background';
  };

  return (
    <div className="rating--stars-row">
      <span>{_.startCase(name)}</span>
      <div className="rating--stars">
        {[1, 2, 3, 4, 5].map((inputRating) => (
          <div className="star-wrapper" key={inputRating}>
            <div className={`clip ${getClassName({ inputRating })}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Rating;
