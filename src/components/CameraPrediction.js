import React from 'react';

const CameraPrediction = ({ isLoading, predictionResult, videoRef }) => {
  return (
    <div>
      <div className='video-container'>
        <div className="loading-spinner" style={{ display: isLoading ? 'flex' : 'none' }}>
          <div className="spinner"></div> {/* Ensure you have CSS for this spinner */}
        </div>
        <div className="video-content">
          <video ref={videoRef} style={{ transform: 'scaleX(-1)' }} autoPlay playsInline />
        </div>
      </div>
      <div className='prediction-container'>
        <p>{predictionResult}</p>
      </div>
    </div>
  );
};

export default CameraPrediction;
