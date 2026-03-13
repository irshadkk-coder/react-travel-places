// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlacesGrid from './PlacesGrid';
import PlaceDetails from './PlaceDetails';
import Header from './Header';

const BASE_API = 'https://traveller.talrop.works/api/v1/places';

function App(){
  return (
<>
     <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlacesGrid apiUrl={BASE_API} />} />
        <Route path="/place/:id" element={<PlaceDetails apiUrl={BASE_API} />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
