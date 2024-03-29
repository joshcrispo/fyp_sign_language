import React from 'react';

const Chatbox = ({ toggleChat, isChatVisible }) => { 
  return (
    <div className={`chatBox ${isChatVisible ? 'chatBox-visible' : ''}`}>
      <p>Incorrect results?
        <br />
        Try adjusting your distance from the camera. You might be too close or too far or TRY DIFFERENT HANDS!
        <br />
        <br />
        Don't know any sign language? Don't worry, head over to the tutorial in our Get Started section.
        <br />
        <br />
        Let us know what you think!
        <br />
        Please fill out the <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=yxdjdkjpX06M7Nq8ji_V2ubyOxn7Da5Pqvpez3v-9rZUNU5WMTRXMkxVNE1VM1hDVE1RSDFWSEszSC4u" target="_blank" rel="noopener noreferrer">Survey</a>
      </p>
      <div className="button-center">
        <button className="reusable-button-style" onClick={toggleChat}>Close</button>
      </div>
    </div>
  );
};

export default Chatbox;
