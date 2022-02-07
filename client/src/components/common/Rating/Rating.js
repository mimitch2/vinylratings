import React, { useState } from 'react';
import PropTypes from 'prop-types';

const HALF_STAR_LOW = 3;
const HALF_STAR_HIGH = 7;

const Rating = ({ rating, onClick }) => {
  const splitRating = rating.split('.');
  const wholeNumber = +splitRating[0];
  const partialNumber = splitRating.length === 2 ? +splitRating[1] : null;
  const [localRating, setLocalRating] = useState();

  // const renderFullStar = () => {
  //   return <i className="fas fa-star"></i>
  // }

  // const renderHalfStar = () => {
  //   return <i className="fad fa-star-half-alt"></i>
  // }

  // const renderEmptyStar = () => {
  //   return <i className="far fa-star"></i>
  // }

  const buildFullStarComponents = () => {
    const components = [];

    for (let index = 0; index < wholeNumber; index++) {
      components.push(<i className="fas fa-star" key={index}></i>)
    }

    if (partialNumber && partialNumber >= HALF_STAR_HIGH) {
      components.push(<i className="fas fa-star" key={999}></i>)
    }

    return components;
  }

  const renderHalfOrEmptyStars = () => {
    const fullStarsLength = buildFullStarComponents().length
    if (fullStarsLength === 5) {
      return null;
    }

    const remainingComponents = [];

    if (partialNumber && partialNumber >= HALF_STAR_LOW && partialNumber < HALF_STAR_HIGH) {
      remainingComponents.push(<i className="fad fa-star-half-alt" key={6}></i>);
    } else {
      remainingComponents.push(<i className="far fa-star" key={987}></i>)
    }

    const remainingStarCount = 5 - (fullStarsLength + 1);

    if (remainingStarCount) {
      for (let index = 0; index < remainingStarCount; index++) {
        remainingComponents.push(<i className="far fa-star" key={index}></i>)
      }
    }

    return remainingComponents;
  }

  return (
    <div>
      {buildFullStarComponents().map(star => star)}
      {renderHalfOrEmptyStars().map(star => star)}
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
