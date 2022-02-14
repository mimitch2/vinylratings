import { COLORS, SIZES } from 'styles';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  min-height: ${(props) => props.minHeight};
  border-radius: ${SIZES.borderRadius};
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const Section = ({ color, bgColor, minHeight, children }) => {
  return (
    <SectionContainer bgColor={bgColor} color={color} minHeight={minHeight}>
      {children}
    </SectionContainer>
  );
};

Section.propTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  minHeight: PropTypes.number
};

Section.defaultProps = {
  color: COLORS.darkerGray,
  bgColor: COLORS.eggshell,
  minHeight: 520
};

export default Section;
