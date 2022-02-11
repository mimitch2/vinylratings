import React from 'react';
import { Rate, Rating } from 'components/common'
import _ from 'lodash';
import PropTypes from 'prop-types';

const RatingsOverview = ({ release, userRating }) => {

  const renderUserRatings = () => {
    const { quietness, flatness, physicalCondition, notes } = userRating;
    const ratings = { quietness, flatness, physicalCondition };

    return (
      <div>
        {_.map(ratings, (value, key) => {
          return (
            <Rating
              rating={value}
              name={key}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="ratings-overview--container">
      {
        userRating ? renderUserRatings() : null
      }

    </div>
  );
};

RatingsOverview.propTypes = {
  release: PropTypes.shape({}).isRequired,
  userRating: PropTypes.shape({}),
};

RatingsOverview.defaultProps = {
  userRating: {}
}

export default RatingsOverview;