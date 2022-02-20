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

const StyledHoverableStarWrapper = styled(StyledStarWrapper)`
  &:hover div {
    opacity: 1;
    background-color: ${COLORS.yellow};
    transform: scale(1.1);
  }
`;

const StyledHoverableStar = styled(StyledStarBackground)`
  transition: all 0.2s ease-in-out;
`;

const Rate = ({ rating, name, onClick }) => {
  const [isHovered, setIsHovered] = useState(0);

  const handleStarClick = ({ inputRating }) => {
    onClick({ key: name, value: inputRating });
  };

  const renderStar = ({ inputRating }) => {
    if ((isHovered && isHovered > inputRating) || (!isHovered && rating >= inputRating)) {
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
        {generateArrayOfNumbers({ length: 5 }).map((inputRating) => {
          return (
            <StyledHoverableStarWrapper
              key={inputRating}
              onMouseEnter={() => {
                setIsHovered(inputRating);
              }}
              onClick={() => {
                handleStarClick({ inputRating });
              }}
            >
              {renderStar({ inputRating })}
            </StyledHoverableStarWrapper>
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
