import React, { createContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Login, About, Collection, WantList, Search } from 'views'
import Header from 'components/Header/Header'
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
            <Route path="/" element={<Search />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/wants" element={<WantList />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
