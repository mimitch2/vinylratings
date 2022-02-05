import React from 'react';
import PropTypes from 'prop-types';
import './loading.scss';
import vinylSVG from '../../../images/vinyl.svg';
import recordPNG from '../../../images/record.png';

const Loading = ({ position, spinnerClassName, spinnerColor, spinnerSize }) => {
  return (
    <div
      className="loading--container"
      style={{
        position
      }}
    >
      {spinnerClassName === 'loading-vinyl' ? (
        <img
          src={vinylSVG}
          className={spinnerClassName}
          width={`${spinnerSize}px`}
          height={`${spinnerSize}px`}
        />
      ) : (
        <i
          className={spinnerClassName}
          style={{
            color: spinnerColor,
            fontSize: spinnerSize
          }}
        />
      )}
    </div>
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
  spinnerColor: 'white',
  spinnerSize: 40
};

export default Loading;
