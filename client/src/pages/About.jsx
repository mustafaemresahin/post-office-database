import React from 'react';
import '../css/About.css';
import image from '../img/about-us-bg.png';
import image1 from '../img/about-us-features-1.png';
import '../css/register.css';
import '../css/tracking.css'; 
function About() {
  return (
    <div className="about-us-container">
      <div className='about-us'>
    
          <div className='about-us-card'>

            <h3>

              Welcome to our website! This is your premier online resource for finding postal services worldwide. With our comprehensive and up-to-date listings, you can easily locate post offices in any country, city, or neighborhood, ensuring that your letters, parcels, and packages are sent or received without hassle.

              Welcome to our website! We are a group 8
            </h3>
            <p>Mustafa, Guillermo, Rayyan, Yla, Athena</p>


          
            <div className='button-holder'>
        <button onClick={()=>{window.location.href="/Send%20Package"}}>Send Package</button>
            <button onClick={()=>{window.location.href="/track"}}>Track Package</button>
            <button onClick={()=>{window.location.href="/register"}}>register</button>
            </div>



        </div>
      </div>

      <h2>Featured Products:</h2>

    

      <div className='featured-products-1'>
          <div className='image-holder-1'>
          <img src= {image1} alt="Description" />
          </div>
          <div className='content-holder-1'>
            <div className='service-title'>
              <h2>Vision</h2> 
            </div>
            <div className='service-info'>
              <h2>Our mission is to provide easy access to postal information and services, whether you're sending a love letter, an important document, or a care package to someone special. We understand the importance of reliable postal services in keeping the world connected, and our database is meticulously maintained by a dedicated team to ensure accuracy and relevance.</h2> 
            </div>
             <button onClick={()=>{window.location.href="/register"}}>Get Started</button>   
            </div>
          



      </div>
      <div className='featured-products-1'>
        <div className='image-holder-2'>
          <img src= {image} alt="Description" />
        </div>
        <div className='content-holder-2'>
          <div className='service-title'>
            <h2>Get Your Supplies</h2> 
          </div>
          <div className='service-info'>
            <h2>Discover a vast array of postal supplies at our post office, designed to meet all your mailing and shipping needs with ease and efficiency. From a wide selection of boxes and envelopes of various sizes to secure your items, to an extensive range of packaging materials ensuring their safe transit, we've got you covered.</h2> 
          </div>
          <button onClick={()=>{window.location.href="/shop"}}>Get Supplies</button>  
        </div>
          
        



      </div>

    </div>
  );


};
export default About;

