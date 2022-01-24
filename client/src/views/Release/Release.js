import React, { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { apiService } from 'services';
import { Routes, Route, Link, useParams, useSearchParams } from "react-router-dom";
import './release.scss'
const queryClient = new QueryClient()


const Release = () => {
  const { id } = useParams();


  // const fetchRelease = async () => {
  //   const res = await fetch(
  //     `${REACT_APP_DISCOGS_ENDPOINT}/releases/${id}`,
  //     {
  //       headers
  //     }
  //   )
  //   const json = await res.json()
  //   return json
  // }
  const { isLoading, error, data, isFetching, isPreviousData } = useQuery(['release', id], () =>
    apiService.request({
      route: `discogs/releases/${id}`,
    }), { keepPreviousData: true }
  )

  if (isLoading) { return 'Loading...' }

  return (
    <div className="release">
      <h1>{data?.artists[0]?.name ?? 'Placeholder'} - {data.title}</h1>
      <img src={data.thumb} />
    </div>
  )
}

export default Release;