import { COLORS } from 'styles';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid ${COLORS.eggshell};
  background: ${COLORS.darkBlue};
  opacity: 0.8;
  padding: 0.3rem 1.5rem;
  cursor: pointer;
  height: 3.2rem;
  border-radius: 1.6rem;
  font-size: 1.6rem;
  color: ${COLORS.eggshell};
  width: 60px

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.4;
    cursor: unset;
  }
`;

const Button = ({ children, onClick, type, disabled, className }) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string
};

Button.defaultProps = {
  children: 'Go!',
  disabled: false,
  onClick: () => {},
  type: 'button',
  className: ''
};

export default Button;
