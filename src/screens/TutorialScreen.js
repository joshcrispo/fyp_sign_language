import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PinnedSubheaderList from '../components/PinnedSubheaderList'; 
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';
import { ModelMapping } from '../components/ModelMapping';
import Chatbox from '../components/Chatbox'; // Import your ChatBox component


const TutorialScreen = () => {

  const [selectedModel, setSelectedModel] = useState('Getting Started'); // Initialize with the name of the default model
  const [selectedVideoId, setSelectedVideoId] = useState(ModelMapping['Getting Started'].videoId); // Initialize video ID state  

  const navigate = useNavigate();

  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
      navigate('/about');
  };  

  const handleTutorialClick = () => {
      navigate('/tutorial')
  };

  const handlePlayClick = () => {
      navigate('/handtracking')
  };

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
    const videoId = ModelMapping[modelName].videoId;
    setSelectedVideoId(videoId);
  };

  useEffect(() => {
    document.title = "SignIT | Tutorial"; 
  }, []);

  return (
    <div>
      <div className='tutorial-screen'>
      <div className="headerTutorial">
          <div className="iconsContainer">
                <HomeIcon className="icon" fontSize='large' onClick={handleHomeClick} />
                <InfoIcon className='icon' fontSize='large' onClick={handleAboutClick}/>
                <SchoolIcon className="icon" fontSize='large' onClick={handleTutorialClick} />
                <PlayArrowIcon className='icon' fontSize='large' onClick={handlePlayClick} />
          </div>
          <h3 className="logo" onClick={handleHomeClick}>SignIT</h3>
      </div>
      <h1>TIME TO LEARN!</h1>
      <div className="main-content">
          <div className="menu-container">
            <PinnedSubheaderList 
              models={Object.keys(ModelMapping)}
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
         <Chatbox isChatVisible={isChatVisible} toggleChat={toggleChat} />
      )}
  </div>
    </div>
  );
};

export default TutorialScreen;





