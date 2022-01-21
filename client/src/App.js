import React from 'react';
import { Routes, Route } from "react-router-dom";
import { About, Discogs } from 'views'
import { Header } from 'components'
import 'scss/main.scss';


const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Discogs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
