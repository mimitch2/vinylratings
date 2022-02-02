import React, { createContext, useState } from 'react';
import { Outlet, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from 'components/Header/Header'
import { Login, About, Collection, WantList, Release, Search } from 'views'

import 'scss/main.scss';
export const UserContext = createContext(null);
const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>

      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <div className="App">
          <Routes>
            <Route path="search" element={<Search />} />
            <Route path="collection" element={<Collection />} />
            <Route path="wants" element={<WantList />} />
            <Route path="releases/:id" element={<Release />} />
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
