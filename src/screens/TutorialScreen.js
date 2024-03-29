import React, { useState, useEffect } from 'react';
import { Chatbox, ModelMapping, HeaderTutorial, PinnedSubheaderList, TutorialVideo } from '../components/index'; 

const TutorialScreen = () => {

  const [selectedModel, setSelectedModel] = useState('Getting Started');
  const [selectedVideoId, setSelectedVideoId] = useState(ModelMapping['Getting Started'].videoId);

  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => setIsChatVisible(!isChatVisible);

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
        <HeaderTutorial />
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
            <TutorialVideo selectedVideoId={ selectedVideoId }/>
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





