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

  const renderOverallAverages = () => {
    if (!vinylRatingsRelease) {
      return null;
    }
    const { overallRatingAverage, quietnessAverage, flatnessAverage, physicalConditionAverage } =
      vinylRatingsRelease;
    const rating = {
      overallRatingAverage,
      quietnessAverage,
      flatnessAverage,
      physicalConditionAverage
    };

    return (
      <div style={{ padding: '50px 0' }}>
        {_.map(rating, (value, key) => {
          return <div key={key}>{renderRatingRow({ key, value })} </div>;
        })}
      </div>
    );
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
      {renderOverallAverages()}
      {renderCurrentUserRating()}
      {renderAllRatings()}
    </div>
  );
};

RatingsOverview.propTypes = {
  vinylRatingsRelease: PropTypes.shape({
    ratingsCount: PropTypes.number,
    overallRatingAverage: PropTypes.number,
    flatnessAverage: PropTypes.number,
    quietnessAverage: PropTypes.number,
    physicalConditionAverage: PropTypes.number,
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
