import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const MainScreen = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <h1>Welcome to SLI App!</h1>
      <Link to="/handtracking">
        <Button style={{ margin: 10}}variant="contained" color="primary">
            Start
        </Button>
      </Link>
      <Link to="/about">
        <Button variant="contained" color="primary">
          Go to About
        </Button>
      </Link>
    </Box>
  );
};

export default MainScreen;
