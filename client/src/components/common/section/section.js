import React from 'react';
import PropTypes from 'prop-types';
import './section.scss';
import { colors } from 'constants';

const Section = ({
  color,
  bgColor,
  flexDirection,
  tabs,
  currentTab,
  setCurrentTab,
  logo,
  logoSize,
  minHeight,
  children
}) => {
  const hasTabs = Boolean(tabs.length);

  return (
    <div
      className="section"
      style={{
        backgroundColor: colors[bgColor],
        color: colors[color],
        minHeight
      }}>
      <header className={hasTabs ? '' : 'no-tabs'}>
        {hasTabs ? (
          <div className="section-tabs">
            {tabs.map(({ value, label }) => {
              const isCurrent = currentTab === value;

              return (
                <button
                  className={`control ${isCurrent ? 'current' : ''}`}
                  key={value}
                  onClick={() => {
                    setCurrentTab(value);
                  }}>
                  {label}
                </button>
              );
            })}
          </div>
        ) : null}
        {logo ? <img src={logo} alt="logo" width={logoSize} /> : null}
      </header>
      <div style={{ flexDirection }}>{children}</div>
    </div>
  );
};

Section.propTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
  flexDirection: PropTypes.string,
  children: PropTypes.node.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  currentTab: PropTypes.number,
  setCurrentTab: PropTypes.func,
  logo: PropTypes.any,
  logoSize: PropTypes.number,
  minHeight: PropTypes.number
};

Section.defaultProps = {
  color: 'darker-grey',
  bgColor: 'green',
  flexDirection: 'row',
  tabs: [],
  currentTab: 1,
  logo: '',
  logoSize: 90,
  minHeight: 300,
  setCurrentTab: () => { }
};

export default Section;
