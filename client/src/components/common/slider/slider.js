import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './slider.scss';

const Slider = ({ onChange, onMouseUp, value, disabled, range, label, showValue }) => {
  return (
    <div className="slider--container">
      {label ? <span className="slider--label">{label}</span> : null}

      <input
        type="range"
        id="slider"
        min={range.min}
        max={range.max}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onMouseUp={() => {
          onMouseUp({ value });
        }}
        value={value}
        disabled={disabled}
      />

      {showValue ? <span className="slider--local-value">{value}</span> : null}
    </div>
  );
};

Slider.propTypes = {
  onChange: PropTypes.func,
  onMouseUp: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabled: PropTypes.bool,
  range: PropTypes.shape({
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired
  }),
  label: PropTypes.string,
  showValue: PropTypes.bool
};

Slider.defaultProps = {
  onChange: _.noop,
  onMouseUp: _.noop,
  disabled: false,
  range: {
    min: '0',
    max: '100'
  },
  label: '',
  showValue: false
};

export default Slider;
