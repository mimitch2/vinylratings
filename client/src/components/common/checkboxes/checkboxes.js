import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { COLORS } from 'styles';
import './checkboxes.scss';

const Checkboxes = ({ label, items, onChange, parentState, color, border }) => {
  const [allSelected, setAllSelected] = useState(false);

  const onLocalChange = ({ value, isChecked }) => {
    let newValue = [...parentState];

    if (value === 'all') {
      if (!isChecked) {
        newValue = items.map((item) => {
          return item.value;
        });
      } else {
        newValue = [];
      }

      setAllSelected((prevState) => {
        return !prevState;
      });
    } else if (isChecked) {
      newValue = newValue.filter((stateValue) => {
        return stateValue !== value;
      });
      setAllSelected(false);
    } else {
      newValue.push(value);
      if (items.length === newValue.length) {
        setAllSelected(true);
      }
    }

    onChange({ value: newValue });
  };

  return (
    <div className="checkboxes-container">
      {label && <h3>{label}</h3>}
      {[
        {
          value: 'all',
          label: 'All'
        },
        ...items
      ].map(({ value, label }) => {
        const isChecked =
          value === 'all'
            ? allSelected
            : Boolean(
                parentState.find((stateValue) => {
                  return stateValue === value;
                })
              );
        return (
          <div className="checkboxes-inner-wrapper" key={value}>
            <div className="checkbox">
              <input
                type="checkbox"
                name={value}
                value={value}
                onChange={() => {
                  onLocalChange({ value, isChecked });
                }}
                checked={isChecked ? 1 : 0}
              />
              <span
                className="checkbox-custom"
                style={{
                  border: `0.1rem solid ${COLORS[border]}`
                }}
              >
                <span className="checkbox-custom-indicator" />
              </span>
              <label
                htmlFor={value}
                style={{
                  color: COLORS[color]
                }}
              >
                {label}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Checkboxes.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  parentState: PropTypes.arrayOf(PropTypes.any).isRequired,
  color: PropTypes.string,
  border: PropTypes.string
};

Checkboxes.defaultProps = {
  label: '',
  color: 'darker-grey',
  border: 'grey'
};

export default Checkboxes;
