import { COLORS, SIZES } from 'styles';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import vinylSVG from '../../../images/vinyl.svg';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  position: ${(props) => props.position};
`;

const Icon = styled.i`
  font-size: 4rem;
  color: ${(props) => props.spinnerColor};
  font-size: ${(props) => props.spinnerSize}rem;
`;

const LoadingVinyl = styled.img`
  animation: ${spin} 2s linear infinite;
`;

const Loading = ({ spinnerClassName, spinnerSize }) => {
  return (
    <LoadingContainer>
      {spinnerClassName === 'vinyl' ? (
        <LoadingVinyl src={vinylSVG} width={`${spinnerSize}px`} height={`${spinnerSize}px`} />
      ) : (
        <Icon className="fas fa-spinner fa-spin" />
      )}
    </LoadingContainer>
  );
};

Loading.propTypes = {
  position: PropTypes.string,
  spinnerClassName: PropTypes.string,
  spinnerColor: PropTypes.string,
  spinnerSize: PropTypes.number
};

Loading.defaultProps = {
  position: 'absolute',
  spinnerClassName: 'fas fa-spinner fa-spin',
  spinnerColor: COLORS.eggshell,
  spinnerSize: 6
};

export default Loading;
