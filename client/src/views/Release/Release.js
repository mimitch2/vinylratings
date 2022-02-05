import React, { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'
import { apiService } from 'services';
import { Routes, Route, Link, useParams, useSearchParams } from "react-router-dom";
import './release.scss'

const Release = () => {
  const { id } = useParams();

  const { isLoading, error, data, isFetching, isPreviousData } = useQuery(['release', id], () =>
    apiService.request({
      route: `discogs/releases/${id}`,
    }), { keepPreviousData: true }
  );

  const { mutateAsync } = useMutation(
    apiService.request({
      method: 'POST',
      route: `discogs/releases/${id}`,
    }),
    {
      onSuccess: (data) => {
        console.log("🚀 ~ file: Release.js ~ line 23 ~ Release ~ data", data)
      },
    });

  if (isLoading) { return 'Loading...' }



  const submitRating = async () => {
    await mutateAsync()
  }

  return (
    <div className="release">
      <h1>{data?.artists[0]?.name ?? 'Placeholder'} - {data.title}</h1>
      <img src={data.thumb} />
      <div>
        <button type="button" onClick={() => { submitRating() }}>
          RATE
        </button>
      </div>
    </div>
  )
}

export default Release;