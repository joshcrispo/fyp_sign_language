import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import { Home as HomeIcon, ArrowDownward as ArrowDownwardIcon, Help } from '@mui/icons-material';
import myPhoto from '../assets/SignITLogoNew.png';
import Chatbox from '../components/Chatbox';
import HeaderAbout from '../components/HeaderAbout';

const AboutScreen = () => {

    const navigate = useNavigate();

    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChat = () => setIsChatVisible(!isChatVisible);


    useEffect(() => {
        document.title = "SignIT | About"; 
    }, []);

    return (
        <div className="mainContainer">
            <div className="welcomeSection">
                <HeaderAbout />
                <div className='about-scroll-one'>
                    <h1>SignIT</h1>
                    <div className='text-container'>
                        <p>Interaction stands as a foundation to understanding one another, 
                            a way for human connection. Verbal Communication the most common 
                            channel for exchanging speech, thoughts, and emotions – this is the standard. 
                            However, according to the World Health Organisation by 2050 an estimated 
                            2.5 billion people are predicted to have some degree of hearing loss, this will 
                            be 1 in 10 people who aren’t able to partake in the global standard of communication.
                            <br /><br />
                            We are proud to present this project that tackles this issue and promote inclusivity to everyone!
                        </p>
                    </div>
                </div>
                <div className="scrollIndicator">
                    <ArrowDownwardIcon fontSize="large" />
                </div>
            </div>

            <div className='about-scroll-two'>
                <div className='text-container'>
                    <h1>What's it about?</h1>
                    <p>In today's world we take conversation for granted, not considering those who are less fortunate.
                        With this in mind we built an AI model able to predict gestures of sign language achieved with the 
                        help of Google's MediaPipe Holistic's model.
                        <br /><br />
                        We hope to tackle this issue by providing inclusivity and education to our users encouraging to learn
                        sign language in a fun and easy way! 
                        </p>
                    <h1>How it works?</h1>
                    <p>For predictions to occur, our team has tested multiple ways for predictions to happen. What we do is that 
                        the webpage takes a sequence of frames from the users camera feed and sends this on to our server where it 
                        is processes with MediaPipe and our trained models. 
                        
                    </p>
                </div>
                <div className='photoLogo'>
                    <img src={myPhoto} alt="Description of the image"/>
                </div>
            </div>

            <div className="about-scroll-three">
                <div className="contentWrapperAbout">
                    <div className="about-video">
                        <h1>A Message From Our Lead Developer</h1>
                        <iframe
                            src={`https://www.youtube.com/embed/SXdPKCN86ws?si=wjEK-YYr55EKxosh`}
                            frameBorder="0"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>
            <button className="floatingButton" onClick={toggleChat}>?</button>
            {isChatVisible && (
             <Chatbox isChatVisible={isChatVisible} toggleChat={toggleChat} />
            )}
        </div>
    );
};

export default AboutScreen;
