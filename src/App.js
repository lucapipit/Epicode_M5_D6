import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';
import DetailBook from './pages/DetailBook';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='bookDetail/:id' element={<DetailBook/>} />
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
