import React from 'react';
import { ArrowDownward } from '@mui/icons-material';

const AboutScrollOne = () => {
    return (
        <div className='about-scroll-one'>
            <h1>SignIT</h1>
            <div className='text-container'>
                <p>Interaction stands as a foundation to understanding one another, 
                    a way for human connection. Verbal Communication the most common 
                    channel for exchanging speech, thoughts, and emotions – this is the standard. 
                    However, according to the World Health Organisation by 2050 an estimated 
                    2.5 billion people are predicted to have some degree of hearing loss, this will 
                    be 1 in 10 people who aren’t able to partake in the global standard of communication.
                    <br /><br />
                    We are proud to present this project that tackles this issue and promote inclusivity to everyone!
                </p>
            </div>
            <div className="scrollIndicator">
                <ArrowDownward fontSize="large" />
            </div>
        </div>
    );
};
  
export default AboutScrollOne;