import React from 'react';
import overlayImage from '../assets/Overlay_SignITV10.png'; // Update with the correct path to your image


const CameraPrediction = ({ isLoading, predictionResult, videoRef, countdown, showOverlay }) => {
  return (
    <div>
      <div className='video-container'>
      {showOverlay && (
        <>
          <img
            src={overlayImage}
            alt="Overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1, // Overlay image
              borderRadius: '25px',
            }}
          />
        </>
      )}
        <div className="loading-spinner" style={{ display: isLoading ? 'flex' : 'none' }}>
          
          <div className="spinner"></div> 
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
