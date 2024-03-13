import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PinnedSubheaderList from '../components/PinnedSubheaderList'; 
import { useNavigate } from 'react-router-dom';

const TutorialScreen = () => {

  const navigate = useNavigate();

  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  const handleHomeClick = () => {
    navigate('/');
  };


  return (
    <div>
      <div className='tutorial-screen'>
      <div className="headerTutorial">
          <div className="iconsContainer">
              <HomeIcon className="icon" fontSize='large' onClick={handleHomeClick}/>
              <InfoIcon className="icon" fontSize='large'/>
          </div>
          <h3 className="logo">SignIT</h3>
      </div>
      <h1>TIME TO LEARN!</h1>
      <div className="main-content">
          <div className="menu-container">
              <PinnedSubheaderList />
          </div>
          <div className='tutorial-container'>
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
    </div>
  );
};

export default TutorialScreen;





