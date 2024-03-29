import React from 'react';
import myPhoto from '../assets/SignITLogoNew.png';


const AboutScrollTwo = () => {
    return (
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
    );
};
  
export default AboutScrollTwo;