import { COLORS, SIZES } from 'styles';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${COLORS.eggshell};
  overflow: hidden;
`;

const StyledTitle = styled.h3`
  color: ${COLORS.darkerGray};
`;

const StyledListWrapper = styled.span`
  border-radius: ${SIZES.borderRadius};
  height: 35rem;
  overflow-y: scroll;
  background-color: ${COLORS.darkBlue};
  display: flex;
  flex-direction: column;
`;

export { StyledWrapper, StyledTitle, StyledListWrapper };
