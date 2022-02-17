import { COLORS } from 'styles';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${COLORS.darkBlue};
  border-radius: 1.6rem;
  border: 1px solid ${COLORS.eggshell};
  color: ${COLORS.eggshell};
  cursor: pointer;
  font-size: 1.6rem;
  height: 3.2rem;
  opacity: 0.8;
  padding: 0.3rem 1.7rem;
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: unset;
    opacity: 0.4;
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
  className: '',
  disabled: false,
  onClick: () => {},
  type: 'button'
};

export default Button;
