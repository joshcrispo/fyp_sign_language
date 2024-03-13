import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Holistic, POSE_CONNECTIONS, FACEMESH_TESSELATION, HAND_CONNECTIONS } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import * as tf from '@tensorflow/tfjs';
import PinnedSubheaderList from '../components/PinnedSubheaderList'; 

let fps = 0;
let lastTime = Date.now();
const predictionCooldownTime = 5000;

const HandTrackingScreen = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChat = () => setIsChatVisible(!isChatVisible);
    const navigate = useNavigate();
    const fpsCanvasRef = useRef(null);
    const videoRef = useRef(null);
    const mainCanvasRef = useRef(null); 
    
    const [model, setModel] = useState(null);
    const [sequence, setSequence] = useState([]);
    const [sentence, setSentence] = useState([]);
    const [predictions, setPredictions] = useState([]);


    const [showOverlay, setShowOverlay] = useState(false);
    const [isCanvasVisible, setIsCanvasVisible] = useState(true);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isCooldownActive, setIsCooldownActive] = useState(false);

    const [predictedAction, setPredictedAction] = useState('None');


    const toggleCanvasVisibility = () => {
        setCanvasVisibility(!isCanvasVisible);
    };

    const handleHomeClick = () => {
        navigate('/');
      };    

    // const actions = ['hello', 'what is your name?', 'my name is', 'how are you?', 'im fine', 'thank you', 'goodbye'];
    // const actions = ['artist', 'hello', 'good'];
    const actions = ['skill', 'pretty', 'good', 'expert', 'delicious', 'beautiful', 'wonderful', 'awesome'];
    const threshold = 0.5;
    const sequenceLength = 30; // Length of the sequence for the LSTM model


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

    const updateSequence = (newKeyPoints) => {
        setSequence(prevSequence => {
            const newSequence = [...prevSequence, newKeyPoints].slice(-sequenceLength);
            return newSequence;
        });
    };

    // Function to make a prediction
    const makePrediction = async (sequence) => {
        if (isCooldownActive) return;
        // Reshape the sequence for the model input
        const inputData = tf.tensor([sequence]); // Shape will be [1, 30, 1662]
        const predictionTensor = await model.predict(inputData);

        const predictionArray = await predictionTensor.array();
        const probabilities = predictionArray[0]; // Probabilities for each class
        const predictedIndex = tf.argMax(probabilities).dataSync()[0];
        const maxProbability = Math.max(...probabilities); // Maximum probability value

        if (maxProbability > threshold) {
            const action = actions[predictedIndex];
            console.log(action);
            setPredictedAction(action); // Update the state with the predicted action
        } else {
            setPredictedAction('Unknown');
        }

        setIsCooldownActive(true);
        setTimeout(() => setIsCooldownActive(false), predictionCooldownTime);

        return predictedAction;
    };

    // useEffect to watch sequence changes
    useEffect(() => {
        if (sequence.length === sequenceLength) {
            makePrediction(sequence);
        }
    }, [sequence]); // Depend on sequence

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadLayersModel('https://raw.githubusercontent.com/joshcrispo/asl-models/master/models/tfjs_lstm_model3/model.json');
                setModel(loadedModel);
                setIsModelLoaded(true);
            } catch (error) {
                console.error('Failed to load model', error);
            }
        };

        loadModel();
    }, []);
  
    useEffect(() => {

        if (!isModelLoaded) return;

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
            const fpsCanvas = fpsCanvasRef.current;
            const fpsContext = fpsCanvas.getContext('2d');
            fpsContext.clearRect(0, 0, fpsCanvas.width, fpsCanvas.height);
            fpsContext.font = '30px Arial';
            fpsContext.fillStyle = 'lime'; // Neon color
            fpsContext.fillText(`FPS: ${fps}`, 10, 30);

            // Normalize keypoints
            const frameWidth = videoElement.videoWidth;
            const frameHeight = videoElement.videoHeight;
            const normalizedKeyPoints = normalizeKeyPoints(results, frameWidth, frameHeight);

            const nowInMs = Date.now();
            const elapsed = nowInMs - lastTime;
            lastTime = nowInMs;

            // Calculate FPS
            fps = Math.round(1000 / elapsed);
            
            updateSequence(normalizedKeyPoints);

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
}, [isModelLoaded]);

return (
    <div className='hand-tracking-screen'>
        <div className="headerHandTracking">
            <div className="iconsContainer">
                <HomeIcon className="icon" fontSize='large'/>
                <InfoIcon className="icon" fontSize='large'/>
            </div>
            <h3 className="logo">SignIT</h3>
        </div>
        <h1>TEST YOURSELF</h1>
        <div className="main-content">
            <div className="menu-container">
                <PinnedSubheaderList />
            </div>
            <div className='video-container'>
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

                {/* FPS canvas without mirroring effect */}
                <canvas style={{
                    position: 'absolute',
                    bottom: 0, // Position it at the bottom or top as you prefer
                    left: '50%',
                    transform: 'translateX(-1)', // Center the FPS counter horizontally
                    width: '200px', // Specify the width as needed
                    height: '150px' // Specify the height as needed
                }} ref={fpsCanvasRef} />
            </div>
        </div>
        <div className='prediction-container'>
            <p>{predictedAction}</p>
        </div>

        {sentence.length > 0 && (
            <div className='sentence'>
                <p>{sentence}</p>
            </div>
        )}
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
