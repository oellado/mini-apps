import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShareResult from './ShareResult';
import MainApp from './MainApp'; // This will be your existing app code

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share-result" element={<ShareResult />} />
        <Route path="/" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;