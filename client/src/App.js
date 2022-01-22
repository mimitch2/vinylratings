import React from 'react';
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { About, Collection, WantList, Search } from 'views'
import { Header } from 'components'
import 'scss/main.scss';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/wants" element={<WantList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
