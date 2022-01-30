import React, { createContext, useState } from 'react';
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
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
          <Outlet />
        </div>
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
