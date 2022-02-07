import React, { useState } from 'react';
import PropTypes from 'prop-types';

const HALF_STAR_LOW = 3;
const HALF_STAR_HIGH = 7;
const FULL_STAR_CLASS = "fas fa-star";
const HALF_STAR_CLASS = "fad fa-star-half-alt";
const EMPTY_STAR_CLASS = "far fa-star";

const Rating = ({ rating, onClick }) => {
  const splitRating = rating.split('.');
  const wholeNumber = +splitRating[0];
  const partialNumber = splitRating.length === 2 ? +splitRating[1] : null;
  const [localRating, setLocalRating] = useState(0);

  const handleStarClick = ({ rating }) => {
    setLocalRating(rating)
  }

  const renderFullStars = () => {
    const stars = [];

    for (let index = 0; index < wholeNumber; index++) {
      stars.push(FULL_STAR_CLASS)
    }

    if (partialNumber && partialNumber >= HALF_STAR_HIGH) {
      stars.push(FULL_STAR_CLASS)
    }

    return stars.map((className, idx) => {
      return <i className={className} key={`${className}-${idx}`}></i>
    });
  }

  const renderHalfOrEmptyStars = () => {
    const fullStarsLength = renderFullStars().length
    if (fullStarsLength === 5) {
      return null;
    }

    const remainingStars = [];

    if (partialNumber && partialNumber >= HALF_STAR_LOW && partialNumber < HALF_STAR_HIGH) {
      remainingStars.push(HALF_STAR_CLASS);
    } else {
      remainingStars.push(EMPTY_STAR_CLASS)
    }

    const remainingStarCount = 5 - (fullStarsLength + 1);

    if (remainingStarCount) {
      for (let index = 0; index < remainingStarCount; index++) {
        remainingStars.push(EMPTY_STAR_CLASS)
      }
    }

    return remainingStars.map((className, idx) => {
      return <i className={className} key={`${className}-${idx}`}></i>
    });
  }

  const renderDisplayStars = () => {
    return (
      <>
        {renderFullStars()}
        {renderHalfOrEmptyStars()}
      </>
    )
  }

  const renderInputStars = () => {
    return [1, 2, 3, 4, 5].map((rating) => {
      const className = localRating && rating <= localRating ? FULL_STAR_CLASS : EMPTY_STAR_CLASS;

      return <i className={className} key={`${className}-${rating}`} onClick={() => {
        handleStarClick({ rating })
      }}></i>
    })
  }

  return (
    <div>
      {rating ? renderDisplayStars() : renderInputStars()}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.string,
  onClick: PropTypes.func,
};

Rating.defaultProps = {
  rating: '',
}

export default Rating;
