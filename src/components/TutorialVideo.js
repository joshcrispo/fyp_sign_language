

import React from 'react';

const TutorialVideo = ({ selectedVideoId }) => { 
    return (
        <iframe
            height="450" // Match the height accordingly
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            frameBorder="0"
            allowFullScreen>
        </iframe>
      );
}

export default TutorialVideo;