import React from 'react';
import { Rate, Rating } from 'components/common';
import _ from 'lodash';
import PropTypes from 'prop-types';

const RatingsOverview = ({ vinylRatingsRelease }) => {
  const renderCurrentUserRating = () => {
    if (!vinylRatingsRelease || _.isEmpty(vinylRatingsRelease)) {
      return <h3>You have not rating this release</h3>;
    }
    const { currentUserRating } = vinylRatingsRelease;

    const { quietness, flatness, physicalCondition, notes } = currentUserRating;

    return (
      <>
        {_.map({ quietness, flatness, physicalCondition }, (value, key) => {
          return <Rating rating={value} name={key} key={key} />;
        })}
        {renderNotes({ notes })}
      </>
    );
  };

  const renderRatingRow = ({ key, value }) => {
    return <Rating rating={value} name={key} key={key} />;
  };

  const renderNotes = ({ notes }) => {
    return (
      <>
        <h3>Notes:</h3>
        <p>{notes}</p>
      </>
    );
  };

  const renderAllRatings = () => {
    // const { vinylRatings } = vinylRatingsRelease;

    return vinylRatingsRelease?.vinylRatings?.length ? (
      <>
        {vinylRatingsRelease.vinylRatings.map(
          ({ quietness, flatness, physicalCondition, notes, _id }) => {
            return (
              <div key={_id}>
                {_.map({ quietness, flatness, physicalCondition }, (value, key) => {
                  return renderRatingRow({ key, value });
                })}
                {renderNotes({ notes })}
              </div>
            );
          }
        )}
      </>
    ) : (
      <p>No ratings yet</p>
    );
  };

  return (
    <div>
      {renderCurrentUserRating()}
      {renderAllRatings()}
    </div>
  );
};

RatingsOverview.propTypes = {
  vinylRatingsRelease: PropTypes.shape({
    currentUserRating: PropTypes.shape({
      quietness: PropTypes.number.isRequired,
      flatness: PropTypes.number.isRequired,
      physicalCondition: PropTypes.number.isRequired,
      notes: PropTypes.string.isRequired
    }),
    vinylRatings: PropTypes.arrayOf(
      PropTypes.shape({
        quietness: PropTypes.number.isRequired,
        flatness: PropTypes.number.isRequired,
        physicalCondition: PropTypes.number.isRequired,
        notes: PropTypes.string.isRequired
      })
    )
  })
};

export default RatingsOverview;
