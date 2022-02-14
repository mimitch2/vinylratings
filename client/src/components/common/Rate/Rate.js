import _ from 'lodash';
import { generateArrayForRating } from 'helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  StyledName,
  StyledStarBackground,
  StyledStarFull,
  StyledStars,
  StyledStarsRow,
  StyledStarWrapper
} from './styledStars';
import styled from 'styled-components';

const StyledHoverableStars = styled(StyledStars)`
  cursor: pointer;
`;

const StyledHoverableStar = styled(StyledStarBackground)`
  &:hover {
    opacity: 1;
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

const Rate = ({ rating, name, onClick }) => {
  const [isHovered, setIsHovered] = useState(0);

  const handleStarClick = ({ inputRating }) => {
    onClick({ key: name, value: inputRating });
  };

  const renderStar = ({ inputRating }) => {
    if (rating && isHovered && isHovered < inputRating) {
      return <StyledStarBackground />;
    }

    if (isHovered >= inputRating || rating >= inputRating) {
      return <StyledStarFull />;
    }

    return <StyledHoverableStar />;
  };

  return (
    <StyledStarsRow>
      <StyledName>{_.startCase(name)}</StyledName>
      <StyledHoverableStars
        onMouseLeave={() => {
          setIsHovered(0);
        }}
      >
        {generateArrayForRating().map((inputRating) => {
          return (
            <StyledStarWrapper
              key={inputRating}
              onMouseEnter={() => {
                setIsHovered(inputRating);
              }}
              onClick={() => {
                handleStarClick({ inputRating });
              }}
            >
              {renderStar({ inputRating })}
            </StyledStarWrapper>
          );
        })}
      </StyledHoverableStars>
    </StyledStarsRow>
  );
};

Rate.propTypes = {
  rating: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default Rate;
