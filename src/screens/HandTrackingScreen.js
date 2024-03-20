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

let fps = 0;
let lastTime = Date.now();
const predictionCooldownTime = 5000;

const HandTrackingScreen = () => {

    const modelMapping = {
        'Default Model': { file: 'aslmodel_v2.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
        'Greetings': { file: 'aslgreetings.h5', videoId: 'QHFgzC026rM?si=WUHC9k8_mPsvjdQU' },
        'Compliments': { file: 'aslcompliments.h5', videoId: 'uvYgwXS3zlw?si=dzPX14pRb8XPi1Gj' },
        'Test': { file: 'test.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
        'Test1': { file: 'aslcompliments.h5', videoId: 'QHFgzC026rM' },
        'Test2': { file: 'aslcompliments.h5', videoId: 'uvYgwXS3zlw' },
        'Test3': { file: 'aslcompliments.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
        'Test4': { file: 'aslcompliments.h5', videoId: 'QHFgzC026rM' },
        'Test5': { file: 'aslcompliments.h5', videoId: 'uvYgwXS3zlw' },
        'Test6': { file: 'aslcompliments.h5', videoId: '-HBJ9WTc0es?si=alQkzL00I6O7TyoJ' },
        'Test7': { file: 'aslcompliments.h5', videoId: 'QHFgzC026rM' }
    };

    const [predictionResult, setPredictionResult] = useState('Press Begin Prediction');

    const [selectedModel, setSelectedModel] = useState('aslmodel_v2.h5'); // Default first model

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
            const newSequence = [...prev, newKeypoints].slice(-30);
            return newSequence;
        });    
    };

    const normalizeKeyPoints = (results, frameWidth, frameHeight) => {
        const pose = results.poseLandmarks ? results.poseLandmarks.map(lm => [lm.x, lm.y, lm.z, lm.visibility]) : new Array(33).fill([0, 0, 0, 0]);
        const face = results.faceLandmarks ? results.faceLandmarks.map(lm => [lm.x, lm.y, lm.z]) : new Array(468).fill([0, 0, 0]);
        const lh = results.leftHandLandmarks ? results.leftHandLandmarks.map(lm => [lm.x, lm.y, lm.z]) : new Array(21).fill([0, 0, 0]);
        const rh = results.rightHandLandmarks ? results.rightHandLandmarks.map(lm => [lm.x, lm.y, lm.z]) : new Array(21).fill([0, 0, 0]);

        // Normalization
        [pose, face, lh, rh].forEach(keypoints => {
            for (let i = 0; i < keypoints.length; i++) {
                keypoints[i][0] /= frameWidth;
                keypoints[i][1] /= frameHeight;
            }
        });
    
        return [].concat(...pose, ...face, ...lh, ...rh).flat();
    };

    const handleModelSelect = (modelName) => {
        setSelectedModel(modelMapping[modelName].file);
    };

    const handleBeginPrediction = () => {
        setKeypointSequences([]);
        setIsRecording(true);
        setPredictionResult("Predicting...")
        
        setTimeout(() => {
            setIsRecording(false);
            handlePredict();
        }, 5000);
    };

    const handlePredict = async () => {
        console.log(keypointSequences.length);
        console.log(selectedModel);
        if (keypointSequences.length < 0) {
            alert("Not enough data for prediction. Please wait until 30 sequences of keypoints are accumulated.");
            return;
        }
        
        try {
            const response = await axios.post('http://127.0.0.1:7860/api/predict/', {
                data: [
                    selectedModel,
                    JSON.stringify(keypointSequences.flat()) // Second input as a JSON string (or another format that matches your Gradio function's expectation)
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {

        const videoElement = videoRef.current;
        const canvasElement = mainCanvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');


        const holistic = new Holistic({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
        });

        holistic.setOptions({
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        holistic.onResults(async (results) => {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            // Only overwrite existing pixels.
            canvasCtx.globalCompositeOperation = 'source-in';
            canvasCtx.fillStyle = '#00FF00';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            // Only overwrite missing pixels.
            canvasCtx.globalCompositeOperation = 'destination-atop';
            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        
            
            canvasCtx.globalCompositeOperation = 'source-over';
            drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                            {color: '#00FF00', lineWidth: 4});
            drawLandmarks(canvasCtx, results.poseLandmarks,
                            {color: '#FF0000', lineWidth: 2});
            drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
                            {color: '#C0C0C070', lineWidth: 1});
            drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                            {color: '#CC0000', lineWidth: 5});
            drawLandmarks(canvasCtx, results.leftHandLandmarks,
                            {color: '#00FF00', lineWidth: 2});
            drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                            {color: '#00CC00', lineWidth: 5});
            drawLandmarks(canvasCtx, results.rightHandLandmarks,
                            {color: '#FF0000', lineWidth: 2});
            
            canvasCtx.restore();

            // Draw FPS
            //const fpsCanvas = fpsCanvasRef.current;
            //const fpsContext = fpsCanvas.getContext('2d');
            //fpsContext.clearRect(0, 0, fpsCanvas.width, fpsCanvas.height);
            //fpsContext.font = '30px Arial';
            //fpsContext.fillStyle = 'lime'; // Neon color
            //fpsContext.fillText(`FPS: ${fps}`, 10, 30);

            // Normalize keypoints
            const frameWidth = videoElement.videoWidth;
            const frameHeight = videoElement.videoHeight;
            const normalizedKeyPoints = normalizeKeyPoints(results, frameWidth, frameHeight);
            accumulateKeypoints(normalizedKeyPoints); // Ensure this is called here

            if (isRecording) {
                const normalizedKeyPoints = normalizeKeyPoints(results, frameWidth, frameHeight);
                accumulateKeypoints(normalizedKeyPoints);
            }

            const nowInMs = Date.now();
            const elapsed = nowInMs - lastTime;
            lastTime = nowInMs;

            // Calculate FPS
            fps = Math.round(1000 / elapsed);
            
        }); 
        
        const camera = new Camera(videoElement, {
        onFrame: async () => {
            await holistic.send({ image: videoElement });
        },
        width: 720,
        height: 450,
        });

        camera.start();

        return () => {
        camera.stop();
        holistic.close();
    };
}, []);

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
                    models={Object.keys(modelMapping)}
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
                        
                        <video style={{ transform: 'scaleX(-1)' }} autoPlay ref={videoRef} />
                        {isCanvasVisible && (
                            // Ensure the canvas covers the video and is also mirrored
                            <canvas style={{ 
                                top: 0,
                                left: 0,
                                transform: 'scaleX(-1)',
                                width: '100%',
                                height: '100%'
                            }} ref={mainCanvasRef} width={720} height={450} />
                        )}

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
                    <p>Prediction Result: {predictionResult}</p>
                </div>
            </div>
        </div>

        <button className="floatingButton" onClick={toggleChat}>?</button>
        {isChatVisible && (
        <div className={`chatBox ${isChatVisible ? 'chatBox-visible' : ''}`}>
            <p>Don't know any sign language? Don't worry, head over to the tutorial in our Get Started section.</p>
            <div className="button-center">
                <button className="reusable-button-style" onClick={toggleChat}>Close</button>
            </div>
        </div>
        )}
    </div>
);

};

export default HandTrackingScreen;
