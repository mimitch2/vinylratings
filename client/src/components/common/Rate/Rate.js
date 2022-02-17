import _ from 'lodash';
import { generateArrayOfNumbers } from 'helpers';
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
import { COLORS } from 'styles';

const StyledHoverableStars = styled(StyledStars)`
  cursor: pointer;
`;

const StyledHoverableStar = styled(StyledStarBackground)`
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
    background-color: ${COLORS.yellow};
    transform: scale(1.1);
  }
`;

const Rate = ({ rating, name, onClick }) => {
  const [isHovered, setIsHovered] = useState(0);

  const handleStarClick = ({ inputRating }) => {
    onClick({ key: name, value: inputRating });
  };

  // if

  const renderStar = ({ inputRating }) => {
    // if (rating && isHovered && isHovered < inputRating) {
    //   return <StyledHoverableStar />;
    // }

    if ((isHovered && isHovered > inputRating) || (!isHovered && rating >= inputRating)) {
      return <StyledStarFull />;
    }

    return <StyledHoverableStar />;
  };

  return (
    <StyledStarsRow>
      <StyledName>{_.startCase(name)}</StyledName>
      <StyledHoverableStars
        className="hover"
        onMouseLeave={() => {
          setIsHovered(0);
        }}
      >
        {generateArrayOfNumbers({ length: 5 }).map((inputRating) => {
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
