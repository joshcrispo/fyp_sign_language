import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PinnedSubheaderList from '../components/PinnedSubheaderList'; 
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Play icon
import { useNavigate } from 'react-router-dom';

const TutorialScreen = () => {

  const modelMapping = {
    'Default Model': { file: 'aslmodel_v2.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
    'Greetings': { file: 'aslgreetings.h5', videoId: 'QHFgzC026rM?si=WUHC9k8_mPsvjdQU' },
    'Compliments': { file: 'aslcompliments.h5', videoId: 'uvYgwXS3zlw?si=dzPX14pRb8XPi1Gj' },
    'Test': { file: 'test.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
    'Test1': { file: 'aslcompliments.h5', videoId: 'QHFgzC026rM' },
    'Test2': { file: 'aslcompliments.h5', videoId: 'uvYgwXS3zlw' },
    'Test3': { file: 'aslcompliments.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
    'Test4': { file: 'aslcompliments.h5', videoId: 'QHFgzC026rM' },
    'Test5': { file: 'aslcompliments.h5', videoId: 'uvYgwXS3zlw' },
    'Test6': { file: 'aslcompliments.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
    'Test7': { file: 'aslcompliments.h5', videoId: 'QHFgzC026rM' }
};

  const [selectedModel, setSelectedModel] = useState('Default Model'); // Initialize with the name of the default model
  const [selectedVideoId, setSelectedVideoId] = useState(modelMapping['Default Model'].videoId); // Initialize video ID state  

  const navigate = useNavigate();

  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handlePlayClick = () => {
    navigate('/handtracking')
  };

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
    const videoId = modelMapping[modelName].videoId;
    setSelectedVideoId(videoId);
  };

  return (
    <div>
      <div className='tutorial-screen'>
      <div className="headerTutorial">
          <div className="iconsContainer">
              <HomeIcon className="icon" fontSize='large' onClick={handleHomeClick}/>
              <InfoIcon className="icon" fontSize='large'/>
              <PlayArrowIcon className="icon" fontSize='large' onClick={handlePlayClick}/>
          </div>
          <h3 className="logo">SignIT</h3>
      </div>
      <h1>TIME TO LEARN!</h1>
      <div className="main-content">
          <div className="menu-container">
            <PinnedSubheaderList 
              models={Object.keys(modelMapping)}
              selectedModel={selectedModel}
              onModelSelect={(handleModelSelect)}
            />
          </div>
          <div className='tutorial-container'>
            <iframe
              height="450" // Match the height accordingly
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              frameBorder="0"
              allowFullScreen>
            </iframe>
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





