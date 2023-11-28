import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';
import HandTrackingScreen from './screens/HandTrackingScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/handtracking" element={<HandTrackingScreen />} />
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
