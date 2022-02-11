import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from 'react-query'
import { apiService } from 'services';
import { useParams } from "react-router-dom";
import _ from 'lodash'
import { UserContext } from 'App'
import { Rate, Rating } from 'components/common'
import './release.scss'

const Release = () => {
  const { user: { username } } = useContext(UserContext)
  const { id } = useParams();
  const [ratings, setRatings] = useState({
    stars: {
      quietness: 0,
      flatness: 0,
      physical_condition: 0,
    },
    notes: ''
  })

  const { isLoading, error, data, isFetching, isPreviousData } = useQuery(['release', id], () =>
    apiService.request({
      route: `discogs/releases/${id}`,
    }), { keepPreviousData: true }
  );

  const { mutateAsync: createRelease } = useMutation(() =>
    apiService.request({
      method: 'POST',
      route: `discogs/releases/${id}`,
      payload: {
        artist: data?.artists[0]?.name,
        title: data.title
      },
      headers: {
        'Content-Type': 'application/json',
      }
    }), { mutationKey: 'rate' });

  const { mutateAsync: rateRelease } = useMutation(() =>
    apiService.request({
      method: userHasRatedThisRelease ? 'PUT' : 'POST',
      route: `discogs/rating`,
      payload: { release_id: id, ratings },
      headers: { 'Content-Type': 'application/json' }
    }), { mutationKey: 'rate' });

  const onRatingClick = ({ key, value }) => {
    setRatings((prevData) => {
      return {
        ...prevData,
        stars: {
          ...prevData.stars,
          [key]: value
        }
      }
    })
  }

  const handleForm = (e) => {
    const isRatingInput = ['quietness', 'flatness', 'physical_condition']
    const { name, value } = e.target;

    setRatings((prevData) => {
      if (isRatingInput.includes(name)) {
        return {
          ...prevData,
          stars: {
            ...prevData.stars,
            [name]: value
          }
        }
      }

      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const submit = async (e) => {
    e.preventDefault();

    if (!data.has_been_rated) {
      await createRelease();
    }
    await rateRelease()
  }

  if (isLoading) { return 'Loading...' }

  const userHasRatedThisRelease = data?.vinyl_ratings ? data.vinyl_ratings.find(({ user: { username: nameFromRating } }) => {
    return nameFromRating === username;
  }) : false;

  const inputs = [
    { name: 'quietness', onChange: handleForm, type: 'number' },
    { name: 'flatness', onChange: handleForm, type: 'number' },
    { name: 'physical_condition', onChange: handleForm, type: 'number' },
    { name: 'notes', onChange: handleForm, type: 'textarea' },
  ];

  return (
    <div className="release">
      {
        _.map(ratings.stars, (__, key) => {
          return (

            <Rate
              key={key}
              name={key}
              onClick={onRatingClick}
              rating={ratings.stars[key]}
            />
          )
        })
      }

      {/* <div className="star-wrapper">
        <div className="clip background" />
        <div className="clip half" />
      </div> */}
      <h1>{data.artists.length ? data.artists[0].name : 'Unkown Artist'} - {data.title}</h1>
      <img src={data.thumb} />
      <form onSubmit={submit}>
        <div>
          {
            inputs.map(({ name, onChange, type }) => {
              return (
                <div key={name}>
                  <label htmlFor={name}>{name}</label>
                  {
                    type === 'textarea' ? <textarea name={name} onChange={onChange} /> :
                      <input type={type} name={name} onChange={onChange} />
                  }
                  <br />
                </div>
              )
            })
          }
        </div>
        <button>
          Submit
        </button>
      </form>
      <Rating rating="1.3" name="quitness" />
    </div>
  )
}

export default Release;