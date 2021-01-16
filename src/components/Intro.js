//import React, {Fragment, useState} from "react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import {ReactComponent as IntroLogoIcon } from "../assets/intrologo.svg"; 
import {ReactComponent as GetStartedIcon } from "../assets/getstarted.svg";
import "./introStyles.css";

const Intro = () =>{
    return(
        <Fragment>
        <div className="container">
            <IntroLogoIcon className="intrologo"/>
            <div className="getstartedlogo">
                <GetStartedIcon />
            </div>
            <Link to="/login"> 
                <button className="get-started-button"> Get started </button>
            </Link>
            
            
           
        </div>
        </Fragment>
        
    );
}

export default Intro
