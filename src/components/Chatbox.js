import React from 'react';

const Chatbox = ({ toggleChat, isChatVisible }) => { 
  return (
    <div className={`chatBox ${isChatVisible ? 'chatBox-visible' : ''}`}>
      <p style={{ color: '#7ED957', fontWeight: 'bolder', WebkitTextStroke: '1px black', fontSize: '1.1em' }}>Incorrect results?</p>
        Position Yourself With The Overlay. Also TRY DIFFERENT HANDS!
        <br />
        <br />
        <p style={{ color: '#7ED957', fontWeight: 'bolder', WebkitTextStroke: '1px black', fontSize: '1.1em' }}>Don't know any sign language?</p><p>Don't worry, head over to the tutorial in our Get Started section.
        <br />
        <br />
        <p style={{ color: '#7ED957', fontWeight: 'bolder', WebkitTextStroke: '1px black', fontSize: '1.1em' }}>Let us know what you think!</p>
        Please fill out the <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=yxdjdkjpX06M7Nq8ji_V2ubyOxn7Da5Pqvpez3v-9rZUNU5WMTRXMkxVNE1VM1hDVE1RSDFWSEszSC4u" target="_blank" rel="noopener noreferrer">Survey</a>
      </p>
      <div className="button-center">
        <button className="reusable-button-style" onClick={toggleChat}>Close</button>
      </div>
    </div>
  );
};

export default Chatbox;
