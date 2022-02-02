import React, { createContext, useState } from 'react';
import { Outlet, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from 'components/Header/Header'
import { Login, About, Collection, WantList, Release, Search } from 'views'

import 'scss/main.scss';
export const UserContext = createContext(null);
const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState({
    username: null
  });


  const RequireAuth = ({ children }) => {
    // let auth = useAuth();
    let location = useLocation();

    if (!user.username) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  }

  return (
    <QueryClientProvider client={queryClient}>

      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <div className="App">
          <Routes>
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Routes>
                    <Route path="search" element={<Search />} />
                    <Route path="collection" element={<Collection />} />
                    <Route path="wants" element={<WantList />} />
                    <Route path="releases/:id" element={<Release />} />
                  </Routes>
                </RequireAuth>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Nothing here!</p>
                </main>
              }
            />
          </Routes>
        </div>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}

export default App;
