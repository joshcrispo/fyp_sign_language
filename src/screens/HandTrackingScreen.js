import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { HeaderPrediction, PinnedSubheaderList,CameraPrediction, ModelMapping, Chatbox } from '../components/index';
 
const HandTrackingScreen = () => {

    const [predictionResult, setPredictionResult] = useState('Press Begin Prediction');
    const [selectedModel, setSelectedModel] = useState('Getting Started');
    const [countdown, setCountdown] = useState('');


    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleChat = () => setIsChatVisible(!isChatVisible);

    const videoRef = useRef(null);

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
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
    
    // Starting Camera Feed
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
        return () => stopCamera();
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
            await new Promise(resolve => setTimeout(resolve, 125)); 
        }
        
        return frames;
    };

    const handleModelSelect = (modelName) => {
        setSelectedModel(modelName);
    };

    const handleBeginPrediction = async () => {
        if (isLoading) {
            alert('Camera is not ready yet.');
            return;
        }

        for (let i = 3; i > 0; i--) {
            setCountdown(`${i}`);
            let countdownMessage = `Get Ready To Sign...`;
            setPredictionResult(countdownMessage);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setCountdown(''); // Clear the countdown message

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
            <HeaderPrediction stopCamera={stopCamera} />
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
                <CameraPrediction
                    isLoading={isLoading}
                    predictionResult={predictionResult}
                    videoRef={videoRef}
                    countdown={countdown}
                />
            </div>
            <button className="floatingButton" onClick={toggleChat}>?</button>
            {isChatVisible && (
            <Chatbox isChatVisible={isChatVisible} toggleChat={toggleChat} />
            )}
        </div>
    );
};

export default HandTrackingScreen;
