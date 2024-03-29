import React from 'react';

const CameraPrediction = ({ isLoading, predictionResult, videoRef, countdown }) => {
  return (
    <div>
      <div className='video-container'>
        <div className="loading-spinner" style={{ display: isLoading ? 'flex' : 'none' }}>
          <div className="spinner"></div> {/* Ensure you have CSS for this spinner */}
        </div>
        {countdown && (
          <>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '25px',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}></div>
          <div className="countdown" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '10rem',
            fontWeight: 'bolder',
            color: '#7ED957',
            WebkitTextStroke: '2px white',
            zIndex: 2,
          }}>
            {countdown}
          </div>
        </>
        )}
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
