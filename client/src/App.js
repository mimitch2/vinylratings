import { apiService } from 'services';
import { COLORS, SIZES, FONT_WEIGHTS } from 'styles';
import { Home, Collection, WantList, Release, Search } from 'views';
import { Outlet, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQuery } from 'react-query';
import Header from 'components/Header/Header';
import React, { createContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
export const UserContext = createContext(null);

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${COLORS.darkBlue};
    font-family: 'Roboto', sans-serif;
    font-size: 62.5%;
  }

  body {
      margin: 0;
      width: 100%;
      height: 100%;
      color: ${COLORS.darkerGray};
  }

  a {
      text-decoration: none;
      color: ${COLORS.darkerGray};

      &.active {
          text-decoration: underline;
      }

      &:hover {
        opacity: 0.7;
      }
  }

  h1, h2, h3, h4, h5, h6, select {
      font-family: 'Roboto Mono', sans-serif;
  }
`;

const AppContainer = styled.div`
  font-weight: ${FONT_WEIGHTS.regular};
  padding: 5rem ${SIZES.sidePadding}rem;
  font-size: 1.6rem;
  height: 100%;

  > div {
    margin: 0 0 2.5rem;
  }
`;

const App = () => {
  const {
    isLoading,
    error,
    data: user,
    isFetching
  } = useQuery(
    'me',
    () =>
      apiService.request({
        route: 'user/me'
      }),
    { refetchOnWindowFocus: false }
  );

  const RequireAuth = () => {
    let location = useLocation();

    if (error || !user.username) {
      return <Navigate to="/home" state={{ from: location }} replace />;
    }

    return <Outlet />;
  };

  return (
    <>
      <UserContext.Provider value={{ user: user || { username: null } }}>
        <GlobalStyle />
        <Header />
        <AppContainer>
          <Routes>
            <Route element={<Outlet />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              {user?.username && !isLoading && (
                <Route element={<RequireAuth />}>
                  <Route path="search" element={<Search />} />
                  <Route path="collection" element={<Collection />} />
                  <Route path="wants" element={<WantList />} />
                  <Route path="releases" element={<Navigate to="/collection" />} />
                  <Route path="releases/:id" element={<Release />} />
                </Route>
              )}
            </Route>
          </Routes>
        </AppContainer>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
