import _ from 'lodash';
import './release.scss';
import { apiService } from 'services';
import { Rate } from 'components/common';
import RatingsOverview from 'components/RatingsOverview/RatingsOverview';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import React, { useState } from 'react';

const Release = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [ratings, setRatings] = useState({
    stars: {
      quietness: 0,
      flatness: 0,
      physicalCondition: 0
    },
    notes: ''
  });

  const { isLoading, data } = useQuery(
    ['release', id],
    () =>
      apiService.request({
        route: `discogs/releases/${id}`
      }),
    { keepPreviousData: true }
  );

  const { mutateAsync: createRelease } = useMutation(
    () =>
      apiService.request({
        method: 'POST',
        route: `discogs/releases`,
        payload: {
          artist: data?.artists[0]?.name,
          title: data.title,
          id
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    { mutationKey: 'rate' }
  );

  const { mutateAsync: rateRelease } = useMutation(
    () =>
      apiService.request({
        method: 'POST',
        route: `discogs/rating`,
        payload: { releaseId: id, ratings },
        headers: { 'Content-Type': 'application/json' }
      }),
    {
      mutationKey: 'rate',
      onSuccess: () => {
        queryClient.invalidateQueries('release');
      }
    }
  );

  const handleRatingClick = ({ key, value }) => {
    setRatings((prevData) => {
      return {
        ...prevData,
        stars: {
          ...prevData.stars,
          [key]: value
        }
      };
    });
  };

  const handleForm = (e) => {
    const isRatingInput = ['quietness', 'flatness', 'physicalCondition'];
    const { name, value } = e.target;

    setRatings((prevData) => {
      if (isRatingInput.includes(name)) {
        return {
          ...prevData,
          stars: {
            ...prevData.stars,
            [name]: value
          }
        };
      }

      return {
        ...prevData,
        [name]: value
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!data.vinylRatingsRelease?.ratingsCount) {
      await createRelease();
    }
    await rateRelease();
  };

  if (isLoading) {
    return 'Loading...';
  }

  const inputs = [
    { name: 'quietness', onChange: handleRatingClick, type: 'rating' },
    { name: 'flatness', onChange: handleRatingClick, type: 'rating' },
    { name: 'physicalCondition', onChange: handleRatingClick, type: 'rating' },
    { name: 'notes', onChange: handleForm, type: 'textarea' }
  ];

  const renderReleaseDetails = () => {
    return (
      <div className="release--details">
        <h1>
          {data.artists?.length ? _.get(data.artists, '[0].name') : 'Unkown Artist'} -{' '}
          {data.title ?? 'Unkown Title'}
        </h1>
        <img src={data.thumb} />
        <form onSubmit={submit}>
          <div>
            {inputs.map(({ name, onChange, type }) => {
              return (
                <div key={name}>
                  {type === 'textarea' ? (
                    <textarea name={name} onChange={onChange} />
                  ) : (
                    <Rate name={name} onClick={onChange} rating={ratings.stars[name]} />
                  )}
                  <br />
                </div>
              );
            })}
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  };

  const renderReleaseRatings = () => {
    return (
      <div className="release--ratings">
        <RatingsOverview vinylRatingsRelease={data.vinylRatingsRelease} />
      </div>
    );
  };

  return (
    <div className="release--container">
      {renderReleaseDetails()}
      {renderReleaseRatings()}
      {/* <h1>
        {data.artists?.length ? _.get(data.artists, '[0].name') : 'Unkown Artist'} -{' '}
        {data.title ?? 'Unkown Title'}
      </h1>
      <img src={data.thumb} /> */}
    </div>
  );
};

export default Release;
