import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HeaderPrediction = ( { stopCamera }) => {
    const navigate = useNavigate();


    const handleHomeClick = () => {
        stopCamera()
        navigate('/');
    };

    const handleAboutClick = () => {
        stopCamera()
        navigate('/about');
    };  

    const handleTutorialClick = () => {
        stopCamera()
        navigate('/tutorial')
    };

    const handlePlayClick = () => {
        navigate('/handtracking')
    };

  return (
    <div className="headerHandTracking">
        <div className="iconsContainer">
            <HomeIcon className="icon" fontSize='large' onClick={handleHomeClick} />
            <InfoIcon className='icon' fontSize='large' onClick={handleAboutClick}/>
            <SchoolIcon className="icon" fontSize='large' onClick={handleTutorialClick} />
            <PlayArrowIcon className='icon' fontSize='large' onClick={handlePlayClick} />
        </div>    
        <h3 className="logo" onClick={handleHomeClick}>SignIT</h3>
    </div>
    );
};

export default HeaderPrediction;
