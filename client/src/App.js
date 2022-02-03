import React, { createContext, useState } from 'react';
import { Outlet, Routes, Route, Navigate, useLocation, } from "react-router-dom";
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from 'components/Header/Header';
import { Login, About, Collection, WantList, Release, Search } from 'views';
import { apiService } from 'services';
import 'scss/main.scss';

export const UserContext = createContext(null);

const App = () => {
  // const [user, setUser] = useState({
  //   username: 'mimitch'
  // });

  const { isLoading, error, data: user, isFetching } = useQuery(['me'], () =>
    apiService.request({
      route: 'discogs/me'
    })
  )

  if (!user || isLoading) {
    return null;
  }



  const RequireAuth = () => {
    // let auth = useAuth();
    let location = useLocation();

    if (!user.username) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
  }

  const Layout = () => {
    return <Outlet />
  }

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <Header />
        <div className="App">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route path="search" element={<Search />} />
                <Route path="collection" element={<Collection />} />
                <Route path="wants" element={<WantList />} />
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
