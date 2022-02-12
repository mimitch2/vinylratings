import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './rate.scss';

const Rate = ({ rating, name, onClick }) => {
  const [isHovered, setIsHovered] = useState(0);

  const handleStarClick = ({ inputRating }) => {
    onClick({ key: name, value: inputRating });
  };

  const isActive = ({ inputRating }) => {
    if (rating && isHovered && isHovered < inputRating) {
      return false;
    }

    return isHovered >= inputRating || rating >= inputRating;
  };

  return (
    <div className="rating--stars-row">
      <span>{_.startCase(name)}</span>
      <div
        className="rating--stars"
        onMouseLeave={() => {
          setIsHovered(0);
        }}
      >
        {[1, 2, 3, 4, 5].map((inputRating) => {
          return (
            <div
              className="star-wrapper"
              key={inputRating}
              onMouseEnter={() => {
                setIsHovered(inputRating);
              }}
              onClick={() => {
                handleStarClick({ inputRating });
              }}
            >
              <div
                className={`clip interactive ${isActive({ inputRating }) ? '' : 'background'}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Rate.propTypes = {
  rating: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default Rate;
