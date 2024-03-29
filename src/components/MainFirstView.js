import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import myPhoto2 from '../assets/SignIT_landscape.png'

const MainFirstView = () => {
  return (
    <div>
      <div className='photoLogo'>
        <img src={myPhoto2} alt="SignIT Logo" style={{ width: '50%', height: 'auto', minWidth: '400px' }}/>
      </div>
      <p><strong style={{fontSize: '1.4em'}}>Bringing the World Closer Together</strong></p>
      <div className="scrollIndicator">
        <ArrowDownwardIcon fontSize="large" />
      </div>
    </div>
  );
};

export default MainFirstView;
