import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Holistic, POSE_CONNECTIONS, FACEMESH_TESSELATION, HAND_CONNECTIONS } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import PinnedSubheaderList from '../components/PinnedSubheaderList'; 
import { ModelMapping } from '../components/ModelMapping';

let fps = 0;
let lastTime = Date.now();
const predictionCooldownTime = 5000;

const HandTrackingScreen = () => {

    const [predictionResult, setPredictionResult] = useState('Press Begin Prediction');

    const [selectedModel, setSelectedModel] = useState('Getting Started');

    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleChat = () => setIsChatVisible(!isChatVisible);
    const navigate = useNavigate();
    //const fpsCanvasRef = useRef(null);
    const videoRef = useRef(null);
    const mainCanvasRef = useRef(null); 
    
    const [keypointSequences, setKeypointSequences] = useState([]);

    const [isCanvasVisible, setIsCanvasVisible] = useState(true);

    const handleHomeClick = () => {
        navigate('/');
    };    

    const handleTutorialClick = () => {
        navigate('/tutorial')
    };

    const accumulateKeypoints = (newKeypoints) => {
        
        setKeypointSequences(prev => {
            const newSequence = [...prev, newKeypoints].slice(-40);
            console.log(newSequence.length);
            return newSequence;
        });    
    };

    useEffect(() => {
        document.title = "SignIT | Prediction"; 
      }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);
    

    useEffect(() => {
        const startCamera = () => {
            const constraints = {
                video: {
                    width: 1280,
                    height: 720
                }
            };
    
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(stream => {
                        videoRef.current.srcObject = stream;
                        setIsLoading(false);
                    })
                    .catch(console.error);
            }
        };

        startCamera();
        return () => videoRef.current && videoRef.current.srcObject && videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }, []);

    const captureFrames = async () => {
        const frames = [];
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
    
        for (let i = 0; i < 40; i++) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            frames.push(canvas.toDataURL('image/jpeg'));
            await new Promise(resolve => setTimeout(resolve, 125)); // 125ms interval for 8fps
        }
    
        return frames; // Should return an array of data URLs
    };

    const handleModelSelect = (modelName) => {
        setSelectedModel(modelName);
    };

    const handleBeginPrediction = async () => {
        if (isLoading) {
            alert('Camera is not ready yet.');
            return;
        }

        // Implement countdown from 3 to 1 before capturing frames
        for (let i = 3; i > 0; i--) {
            let countdownMessage = `Starting in ${i}...`;
            setPredictionResult(countdownMessage);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second intervals
        }

        setPredictionResult("Capturing frames...");
        const frames = await captureFrames();

        setPredictionResult("Predicting...");
        handlePredict(frames);
    };

    const handlePredict = async (frames) => {
        console.log(frames); // Add this line to check the contents of `frames`
        try {
            const response = await axios.post('http://127.0.0.1:7860/api/predict/', {
                data: [
                    selectedModel,
                    JSON.stringify(frames)                
                ]
            });
            console.log("Prediction response:", response.data);
            const resultString = response.data.data[0];
            setPredictionResult(resultString); // Update the prediction result state
        } catch (error) {
            console.error("Error during prediction:", error);
            setPredictionResult("Error during prediction.");
        }
    };

return (
    <div className='hand-tracking-screen'>
        <div className="headerHandTracking">
            <div className="iconsContainer">
                <HomeIcon className="icon" fontSize='large' onClick={handleHomeClick}/>
                <InfoIcon className="icon" fontSize='large'/>
                <SchoolIcon className="icon" fontSize='large' onClick={handleTutorialClick}/>
            </div>
            <h3 className="logo">SignIT</h3>
        </div>
        <h1>TEST YOURSELF</h1>
        <div className="main-content">
            <div className="menu-container">
                <PinnedSubheaderList 
                    models={Object.keys(ModelMapping)}
                    selectedModel={selectedModel}
                    onModelSelect={(handleModelSelect)}
                />
                <button className="reusable-button-style" onClick={handleBeginPrediction}>Begin Prediction</button>
            </div>
            <div>
                <div className='video-container'>
                    <div className="loading-spinner" style={{ display: isLoading ? 'flex' : 'none' }}>
                        <div className="spinner"></div> {/* Animated spinner */}
                    </div>
                    <div className="video-content">
                        
                        <video ref={videoRef} style={{ transform: 'scaleX(-1)' }} autoPlay playsInline />
                        {/* FPS canvas without mirroring effect 
                        <canvas style={{
                            position: 'absolute',
                            bottom: 0, // Position it at the bottom or top as you prefer
                            left: '50%',
                            transform: 'translateX(-1)', // Center the FPS counter horizontally
                            width: '200px', // Specify the width as needed
                            height: '150px' // Specify the height as needed
                        }} ref={fpsCanvasRef} />
                        */}
                    </div>
                </div>
                <div className='prediction-container'>
                    <p>{predictionResult}</p>
                </div>
            </div>
        </div>

        <button className="floatingButton" onClick={toggleChat}>?</button>
        {isChatVisible && (
        <div className={`chatBox ${isChatVisible ? 'chatBox-visible' : ''}`}>
            <p>If you are experiencing some incorrect results try changing your position. You might be too close or too far from the camera.<br /><br />
                Some troublesome categories:<br />
                - Responses <br />
                <br />
                Don't know any sign language? Don't worry, head over to the tutorial in our Get Started section.</p>
            <div className="button-center">
                <button className="reusable-button-style" onClick={toggleChat}>Close</button>
            </div>
        </div>
        )}
    </div>
);

};

export default HandTrackingScreen;
