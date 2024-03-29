import React, { useState, useEffect } from 'react';
import { AboutScrollOne, AboutScrollTwo, AboutScrollThree, HeaderAbout, Chatbox } from '../components/index';

const AboutScreen = () => {
    
    const [isChatVisible, setIsChatVisible] = useState(false);
    const toggleChat = () => setIsChatVisible(!isChatVisible);

    useEffect(() => {
        document.title = "SignIT | About"; 
    }, []);

    return (
        <div className="mainContainer">
            <div className="welcomeSection">
                <HeaderAbout />
                <AboutScrollOne />
            </div>
            <AboutScrollTwo />
            <AboutScrollThree />
            <button className="floatingButton" onClick={toggleChat}>?</button>
            {isChatVisible && (
             <Chatbox isChatVisible={isChatVisible} toggleChat={toggleChat} />
            )}
        </div>
    );
};

export default AboutScreen;
