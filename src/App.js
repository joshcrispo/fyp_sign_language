import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './screens/MainScreen';
import TutorialScreen from './screens/TutorialScreen';
import HandTrackingScreen from './screens/HandTrackingScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tutorial" element={<TutorialScreen />} />
        <Route path="/handtracking" element={<HandTrackingScreen />} />
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
