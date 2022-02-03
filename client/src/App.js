import React, { createContext } from 'react';
import { Outlet, Routes, Route, Navigate, useLocation, } from "react-router-dom";
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from 'components/Header/Header';
import { Home, Collection, WantList, Release, Search } from 'views';
import { apiService } from 'services';
import 'scss/main.scss';

export const UserContext = createContext(null);

const App = () => {
  const { isLoading, error, data: user, isFetching } = useQuery(['me'], () =>
    apiService.request({
      route: 'discogs/me'
    }), { keepPreviousData: true }
  )

  if (!user || isLoading) {
    return null;
  }

  const RequireAuth = () => {
    let location = useLocation();

    if (!user.username) {
      return <Navigate to="/home" state={{ from: location }} replace />;
    }

    return <Outlet />;
  }

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <Header />
        <div className="App">
          <Routes>
            <Route element={<Outlet />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route element={<RequireAuth />}>
                <Route path="search" element={<Search />} />
                <Route path="collection" element={<Collection />} />
                <Route path="wants" element={<WantList />} />
                <Route path="releases" element={<Navigate to="/collection" />} />
                <Route path="releases/:id" element={<Release />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
