import React from 'react';
import PropTypes from 'prop-types';
import './select.scss';

const Select = ({ onChange, values, disabled = false, label = '' }) => {
  return (
    <div className="custom-select">
      <label htmlFor="select">{label}</label>

      <select
        className={disabled ? 'disabled' : ''}
        id="select"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        disabled={disabled}
      >
        {values.map(({ id, name, count }) => {
          return (
            <option key={id} value={id}>
              {`${name} (${count})`}
            </option>
          );
        })}
      </select>
    </div>
  );
};
Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

Select.defaultProps = {
  disabled: false,
  label: ''
};

export default Select;
