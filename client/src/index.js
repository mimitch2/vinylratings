import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import { Login, About, Collection, WantList, Release, Search } from 'views'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
