import React from 'react';
import './Navbar.css';
import { FaBookmark } from 'react-icons/fa';
import { GrPrevious } from "react-icons/gr";

import loginicon from '../assets/loginicon.png';
import { Link } from 'react-router-dom';

const navbar = (props) => {

    
    const profileClick = () => {
        console.log("Clicked on profile");
    }

    const savedIconClick = () => {
        console.log("Clicked on saved icon");
    }
    

    return (
        <div className = "Navbar">
            <div className="left-header">

                { props.backbutton === "Show" ? 
                <Link to="/dashboard"> <GrPrevious className="previousPageIcon" /> </Link> : 
                <div></div> }

                <div className = "profile" onClick = {profileClick}>
                    {/* Profile is made visible here*/}
                    <img src={loginicon} alt="" /> 
                </div>
                <div className = "profile-name">
                    <p>Hello, {props.name}</p>
                </div>
            </div>
            { props.savedbutton === "Show" ? 
                (<div className = "saved" onClick = {savedIconClick}> 
                <Link to={{pathname: '/saved', state: { userid: props.userid, username: props.name} }} > <p><FaBookmark className="bookmark"/>  Saved </p> </Link> 
                </div> )
                :
                (<div></div> )
            }
            
        </div>
    );
}
export default navbar;