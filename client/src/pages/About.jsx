import React, { useState, useEffect } from 'react';
import '../css/About.css';
import image from '../img/about-us-bg.png';
import '../css/register.css';
import '../css/tracking.css'; 
import { useNavigate } from 'react-router-dom';
function About() {
  return (
    <div className="about-us-container">
      <div className='about-us'>
    
          <div className='about-us-card'>

            <h3>
              Welcome to our website! We are a group hlakdhlkhdlkqwhsjhckjashjkah fjfgjkgjjllhlkhk
            </h3>

          
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
          <img src= {image} alt="Description" />
          </div>
          <div className='content-holder-1'>
            <div className='service-title'>
              <h2>Free Supplies</h2> 
            </div>
            <div className='service-info'>
              <h2>Ship with free Priority Mail® or Priority Mail Express® envelopes and boxes. Our supplies get you mailing and shipping in no time.</h2> 
            </div>
             <button href="#text-buttons">Order Now</button>   
            </div>
          



      </div>
      <div className='featured-products-1'>
        <div className='image-holder-2'>
          <img src= {image} alt="Description" />
        </div>
        <div className='content-holder-2'>
          <div className='service-title'>
            <h2>Free Supplies</h2> 
          </div>
          <div className='service-info'>
            <h2>Ship with free Priority Mail® or Priority Mail Express® envelopes and boxes. Our supplies get you mailing and shipping in no time.</h2> 
          </div>
          <button href="#text-buttons">Order Now</button>
        </div>
          
        



      </div>

    </div>
  );


};
export default About;

