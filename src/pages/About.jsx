import React, { useState, useEffect } from 'react';
import '../About.css';

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoading(false);
    };

    const image = new Image();
    image.src = process.env.PUBLIC_URL + '/mail_open.png'; // Assuming image is in public folder
    image.onload = handleImageLoad;

    return () => {
      image.onload = null;
    };
  }, []);

  return (
    <div className="about-us-container">
      {isLoading && <div className="loading-animation"></div>}
      <img
        src={process.env.PUBLIC_URL + '/mail_open.png'}
        alt="About Us"
        className="background-image"
      />
      <div className="text-overlay">
        <h1>Hello, this is the about section of our home screen!</h1>
      </div>
    </div>
  );
};

export default AboutUs;
