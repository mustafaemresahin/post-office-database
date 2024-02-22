import React from 'react'; 
import { Link } from "react-router-dom";
import logo from '../assets/mailbox.png';

const Header = () => {
    return (
        <header>
        <div className="websiteName"> </div>

        <div className="logo">
            
        </div>
        
            <nav> 
                <li> 
                    <Link to ="/login"> login/signup </Link>
                </li>
            </nav>
        </header>

    );
};

export default Header; 