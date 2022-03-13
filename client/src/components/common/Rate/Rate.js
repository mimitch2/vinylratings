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

const HoverableStars = styled(StyledStars)`
  cursor: pointer;
`;

const HoverableStarWrapper = styled(StyledStarWrapper)`
  &:hover div {
    opacity: 1;
    background-color: ${COLORS.yellow};
  }
`;

const HoverableStar = styled(StyledStarBackground)`
  transition: all 0.2s ease-in-out;
  transform: scale(1.1);
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

    return <HoverableStar />;
  };

  return (
    <StyledStarsRow>
      <StyledName>{_.startCase(name)}</StyledName>
      <HoverableStars
        onMouseLeave={() => {
          setIsHovered(0);
        }}
      >
        {generateArrayOfNumbers({ length: 5 }).map((inputRating) => {
          return (
            <HoverableStarWrapper
              key={inputRating}
              onMouseEnter={() => {
                setIsHovered(inputRating);
              }}
              onClick={() => {
                handleStarClick({ inputRating });
              }}
              tabIndex="0"
              role="input"
              aria-pressed="false"
              onKeyDown={(e) => {
                if (e.keyCode === 13 || e.keyCode === 32) {
                  handleStarClick({ inputRating });
                }
              }}
            >
              {renderStar({ inputRating })}
            </HoverableStarWrapper>
          );
        })}
      </HoverableStars>
    </StyledStarsRow>
  );
};

Rate.propTypes = {
  rating: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default Rate;
