import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AdditionalInformationPage from './pages/AdditionalInformationPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/more-info" element={<AdditionalInformationPage />} />
    </Routes>
  );
}

export default App;
