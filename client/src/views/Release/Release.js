import React, { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'
import { apiService } from 'services';
import { Routes, Route, Link, useParams, useSearchParams } from "react-router-dom";
import './release.scss'

const Release = () => {
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
    }), { mutationKey: 'rate' });

  const { mutateAsync: rateRelease } = useMutation(() =>
    apiService.request({
      method: 'POST',
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

  return (
    <div className="release">
      <h1>{data?.artists[0]?.name ?? 'Placeholder'} - {data.title}</h1>
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