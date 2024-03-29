import React, { useState, useEffect } from 'react';
import Chatbox from '../components/Chatbox';
import HeaderAbout from '../components/HeaderAbout';
import MainFirstView from '../components/MainFirstView';
import MainSecondView from '../components/MainSecondView';

const MainScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  useEffect(() => {
    document.title = "SignIT | Home"; 
  }, []);

  return (
    <div className="mainContainer">
      <div className="welcomeSection">
        <HeaderAbout />
        <MainFirstView />
      </div>
      <div className="getStartedSection">
        <MainSecondView />
      </div>
      <button className="floatingButton" onClick={toggleChat}>?</button>
      {isChatVisible && (
          <Chatbox isChatVisible={isChatVisible} toggleChat={toggleChat} />
      )}
    </div>
  );
};

export default MainScreen;