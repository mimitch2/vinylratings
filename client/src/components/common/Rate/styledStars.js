import { COLORS } from 'styles';
import styled from 'styled-components';

const StyledStarsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const StyledName = styled.span`
  margin-right: 3rem;
`;

const StyledStars = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
`;

const StyledStarWrapper = styled.div`
  display: block;
  position: relative;
  height: 2rem;
  width: 2rem;
`;

const StyledStarFull = styled.div`
  height: 2rem;
  width: 2rem;
  box-sizing: border-box;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  background-color: ${COLORS.eggshell};
`;

const StyledStarHalf = styled(StyledStarFull)`
  clip-path: polygon(50% 0%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
`;

const StyledStarBackground = styled(StyledStarFull)`
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0.2;
`;

export {
  StyledStarsRow,
  StyledName,
  StyledStars,
  StyledStarWrapper,
  StyledStarFull,
  StyledStarHalf,
  StyledStarBackground
};
