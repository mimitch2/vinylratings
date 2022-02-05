import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from 'react-query'
import { apiService } from 'services';
import { useParams } from "react-router-dom";
import { UserContext } from 'App'
import './release.scss'

const Release = () => {
  const { user: { username } } = useContext(UserContext)
  const { id } = useParams();
  const [ratings, setRatings] = useState({
    quietness: '',
    clarity: '',
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
      headers: {
        'Content-Type': 'application/json',
      }
    }), { mutationKey: 'rate' });

  const handleForm = (e) => {
    setRatings((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
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

  const userHasRatedThisRelease = data?.vinyl_ratings ? data.vinyl_ratings.find((rating) => {
    return rating.user.username === username;
  }) : false

  return (
    <div className="release">
      <h1>{data.artists.length ? data.artists[0].name : 'Unkown Artist'} - {data.title}</h1>
      <img src={data.thumb} />
      <form onSubmit={submit}>
        <div>
          <label htmlFor="quietness">Quietness</label>
          <input type="number" name="quietness" onChange={handleForm} />
          <br />
          <label htmlFor="calrity">Clarity</label>
          <input type="number" name="clarity" onChange={handleForm} />
          <br />
          <label htmlFor="calrity">Notes</label>
          <input type="text-area" name="notes" onChange={handleForm} />
          <br />
        </div>
        <button>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Release;