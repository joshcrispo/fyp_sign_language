import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import { Home as HomeIcon, ArrowDownward as ArrowDownwardIcon, Help } from '@mui/icons-material';

const MainScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => setIsChatVisible(!isChatVisible);


  useEffect(() => {
    document.title = "SignIT | Home"; 
  }, []);

  return (
    <div className="mainContainer">
      <div className="welcomeSection">
        <div className="header">
          <div className="iconsContainer">
            <HomeIcon className="icon" fontSize='large' />
            <InfoIcon className="icon" fontSize='large'/>
          </div>
          <h3 className="logo">SignIT</h3>
        </div>
        <h1>Welcome to SignIT</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="scrollIndicator">
          <ArrowDownwardIcon fontSize="large" />
        </div>
      </div>

      <div className="getStartedSection">
        <div className="contentWrapper">
            <div className="textContent">
              <h1>Get Started</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/handtracking">
                <Button variant="contained">SignIT!</Button>
              </Link>
              <Link to="/tutorial">
                <Button variant="contained">Tutorial</Button>
              </Link>
            </div>
          </div>
      </div>
      <button className="floatingButton" onClick={toggleChat}>?</button>
      {isChatVisible && (
        <div className={`chatBox ${isChatVisible ? 'chatBox-visible' : ''}`}>
          <p>Don't know any sign language? Don't worry, head over to the tutorial in our Get Started section.</p>
          <div className="button-center">
            <button className="reusable-button-style" onClick={toggleChat}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
