import React from 'react';

const AboutScrollThree = () => {
    return (
        <div className="about-scroll-three">
            <div className="contentWrapperAbout">
                <div className="about-video">
                    <h1>A Message From Our Lead Developer</h1>
                    <iframe
                        src={`https://www.youtube.com/embed/SXdPKCN86ws?si=wjEK-YYr55EKxosh`}
                        frameBorder="0"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default AboutScrollThree;