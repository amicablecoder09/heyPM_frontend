//import React, {Fragment, useState} from "react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import {ReactComponent as IntroLogoIcon } from "../assets/intrologo.svg"; 
import {ReactComponent as GetStartedIcon } from "../assets/getstarted.svg";
import styles from "./introStyles.module.css";

const Intro = () =>{
    return(
        <Fragment>
        <div className={styles.container}>
            <IntroLogoIcon className={styles.intrologo}/>
            {/* <div className={styles.getstartedlogo}>
                <GetStartedIcon />
            </div> */}
            <div className={styles.welcome}>
                <h4>Welcome to beingPM</h4>
                <h5>Community for Product Managers</h5>
            </div>
            <Link to="/login"> 
                <button className={styles.getStartedButton}> Get started </button>
            </Link>
        </div>
        </Fragment>  
    );
}

export default Intro
