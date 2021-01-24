import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import {VscSmiley} from "react-icons/vsc";
import Styles from "./ProfileStyle.css";

const Profile = (props, {setAuth}) => {

    const [ fullname, setFullname ] = useState(""); 
    const [ email, setEmail ] = useState("");

    async function getUserDetails() {
        try {
            const response = await fetch("https://heypm-backend.herokuapp.com/dashboard/",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            console.log(parseRes);

            const name = parseRes.user_name;
            setFullname(name);
            setEmail(parseRes.user_email);

        } catch (err) {
            //console.error(err.message);
        }
    }

    const logout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
        //toast("Logged out successfully!"); // not working
    };

    useEffect(()=>{
        getUserDetails()
    },[]); 

    return (
        <div>
            <Navbar name = {props.location.state.username}
            userid={props.location.state.userid} savedbutton ="Show"  backbutton="Show"/>
            <div className = "profile-section">
            <div className = "profile-header">
                <div>
                    <h4>Your Profile</h4>
                </div>
            </div>
            <div className = "profile-picture">
                <div>
                    <VscSmiley size = {80}/>
                </div>
            </div>
            <div className = "Profile-content">
                <div className = "name">
                    <div className = "question">
                        <p>Name</p>
                    </div>
                    <div>
                        <p>{fullname}</p>
                    </div>
                </div>

                <div className = "user-name">
                    <div className = "question">
                        <p>Username</p>
                    </div>
                    <div>
                        <p>My_username</p>
                    </div>
                </div>

                <div className = "user-email">
                    <div className = "question">
                        <p>Email ID</p>
                    </div>
                    <div>
                        <p>{email}</p>
                    </div>
                </div>
                <div>
                    <hr></hr>
                </div>
                {/* <div className = "change-password">
                    <p>Change Password</p>
                </div>

                <div>
                    <hr></hr>
                </div> */}
                <div className = "log-out">
                    <p onClick= {e => logout(e)}>Log Out</p>
                </div>

            </div>
        </div>
        </div>
    )
}

export default Profile
