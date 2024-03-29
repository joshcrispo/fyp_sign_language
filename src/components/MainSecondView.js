import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Assuming you're using Material-UI for buttons

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
          <strong style={{ fontSize: '1.2em', color: '#7ED957' }}>
            Remember:<br /> Switch hands or adjust distance from camera if results are not satisfactory.
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
