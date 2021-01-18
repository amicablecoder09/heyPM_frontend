import React from 'react';
import './Navbar.css';
import { FaBookmark } from 'react-icons/fa';



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
                <div className = "profile" onClick = {profileClick}>
                    {/* Profile is made visible here*/}
                </div>
                <div className = "profile-name">
                    <p>Hello, {props.name}</p>
                </div>
            </div>
            <div className = "saved" onClick = {savedIconClick}>
                <p><FaBookmark className="bookmark"/> Saved</p>
            </div>
        </div>
    );
}
export default navbar;