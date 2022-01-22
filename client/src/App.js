import React from 'react';
import { Routes, Route } from "react-router-dom";
import { About, Collection } from 'views'
import { Header } from 'components'
import 'scss/main.scss';


const App = () => {
  return (
    <div>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Collection />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
