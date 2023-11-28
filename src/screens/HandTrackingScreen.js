// HandTrackingScreen.js

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import Button from '@mui/material/Button';
import './HandTrackingScreen.css';

let video;
let handLandmarker;
let lastVideoTime = -1;
let fps = 0;
let lastTime = Date.now();

const HandTrackingScreen = () => {
    const navigate = useNavigate(); // Hook to access the history object
    const mainCanvasRef = useRef(null);
    const fpsCanvasRef = useRef(null);
    const [isCanvasVisible, setCanvasVisibility] = useState(true);

    const toggleCanvasVisibility = () => {
        setCanvasVisibility(!isCanvasVisible);
    };

    const handleBackButtonClick = () => {
        cleanupResources();
        navigate('/');
      };
    
    const cleanupResources = () => {
        if (handLandmarker) {
            handLandmarker.close();
            handLandmarker = null;
        }

        // Stop the video stream or perform any necessary cleanup
        if (video) {
            video.removeEventListener('loadeddata', predict);
            video.srcObject?.getTracks().forEach((track) => track.stop());
            video.srcObject = null;
        }
    };

    const setup = async () => {
        cleanupResources();
        
        const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
        handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
            },
            runningMode: 2,
            numHands: 2
        }
        );

        video = document.getElementById("video");
        navigator.mediaDevices.getUserMedia({
        video: { width: 1000, height: 600 },
        audio: false
        }).then((stream) => {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predict);
        });
    };

    const drawLandmarks = (landmarks) => {
        const mainCanvas = mainCanvasRef.current;

        if (!mainCanvas) {
            return;
        }

        const mainContext = mainCanvas.getContext('2d');
        mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

        if (landmarks && landmarks.length > 0) {
        landmarks.forEach((handLandmarks) => {
            const fingers = [
            [0, 1, 2, 3, 4],   // Thumb
            [0, 5, 6, 7, 8],   // Index finger
            [0, 9, 10, 11, 12], // Middle finger
            [0, 13, 14, 15, 16],// Ring finger
            [0, 17, 18, 19, 20] // Pinky finger
            ];

            // Connect points for each finger
            fingers.forEach((fingerPoints) => {
            // Draw lines connecting the finger points
            mainContext.beginPath();
            fingerPoints.forEach((index, i, arr) => {
                const x = handLandmarks[index].x * mainCanvas.width;
                const y = handLandmarks[index].y * mainCanvas.height;

                if (i === 0) {
                mainContext.moveTo(x, y);
                } else {
                mainContext.lineTo(x, y);
                }
            });

            mainContext.strokeStyle = 'black';
            mainContext.lineWidth = 4;
            mainContext.stroke();
            });

            const specificPoints = [5, 9, 13, 17];
            mainContext.beginPath();
            specificPoints.forEach((index, i, arr) => {
            const x = handLandmarks[index].x * mainCanvas.width;
            const y = handLandmarks[index].y * mainCanvas.height;

            if (i === 0) {
                mainContext.moveTo(x, y);
            } else {
                mainContext.lineTo(x, y);
            }
            });

            mainContext.strokeStyle = 'black'; 
            mainContext.lineWidth = 4;
            mainContext.stroke();

            // Draw circles at each finger point
            fingers.forEach((fingerPoints) => {
            fingerPoints.forEach((index) => {
                const x = handLandmarks[index].x * mainCanvas.width;
                const y = handLandmarks[index].y * mainCanvas.height;

                mainContext.beginPath();
                mainContext.arc(x, y, 10, 0, 2 * Math.PI);
                mainContext.fillStyle = 'red';
                mainContext.fill();
                mainContext.stroke();
            });
            });
        });
        }

        // Draw FPS
        const fpsCanvas = fpsCanvasRef.current;
        const fpsContext = fpsCanvas.getContext('2d');
        fpsContext.clearRect(0, 0, fpsCanvas.width, fpsCanvas.height);
        fpsContext.font = '30px Arial';
        fpsContext.fillStyle = 'lime'; // Neon color
        fpsContext.fillText(`FPS: ${fps}`, 10, 30);
    };

    const predict = () => {
        const nowInMs = Date.now();
        const elapsed = nowInMs - lastTime;
        lastTime = nowInMs;

        // Calculate FPS
        fps = Math.round(1000 / elapsed);

        if (!handLandmarker) {
            console.error('handLandmarker is null');
            return;
        }

        if (lastVideoTime !== video.currentTime) {
                lastVideoTime = video.currentTime;
                // Check if detectForVideo is available
                if (!handLandmarker.detectForVideo) {
                    console.error('detectForVideo is not available on handLandmarker');
                    return;
                }
                const result = handLandmarker.detectForVideo(video, Date.now());
                console.log(result.landmarks)
                drawLandmarks(result.landmarks);
        }
        requestAnimationFrame(predict);
    };

    useEffect(() => {
        setup();
        }, []);

    return (
        <div className='hand-tracking-screen'>
            <div className='video-container'>
                <video style={{ transform: 'scaleX(-1)' }} autoPlay id='video' />
                {isCanvasVisible && (
                    <canvas style={{ transform: 'scaleX(-1)' }} ref={mainCanvasRef} width={1000} height={600} />
                )}
                <canvas ref={fpsCanvasRef} />
            </div>
            <div>
                <Button className='back-button' style={{ margin: 5 }} variant="outlined" onClick={handleBackButtonClick}>
                    &#x2190; Back
                </Button>
                <Button className='toggle-canvas-button' style={{ margin: 5 }} variant="outlined" onClick={toggleCanvasVisibility}>
                    {isCanvasVisible ? 'Hide Canvas' : 'Show Canvas'}
                </Button>
            </div>
        </div>
    );
};
export default HandTrackingScreen;
