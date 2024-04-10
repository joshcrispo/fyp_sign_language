import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const MainSecondView = () => {
  return (
    <div className="contentWrapper">
      <div className="textContent">
        <h1>Get Started</h1>
        <p>
          <strong>We at SignIT recommend you to first try out the tutorial before starting the SignIT Predictions!</strong>
          <br /><br />
          <strong style={{ fontSize: '1.2em' }}>Learn then Test!</strong>
          <br /><br />
          <strong style={{ fontSize: '1.4em', color: '#7ED957', WebkitTextStroke: '1px black', }}>Incorrect Result?</strong>
          <strong style={{ fontSize: '1.6em', color: '#7ED957', WebkitTextStroke: '1px black', }}>
            <br />Position Yourself With The Overlay, Also TRY DIFFERENT HANDS!
          </strong>
        </p>
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
  );
};

export default MainSecondView;
