import React, {useState, useEffect } from 'react';
import './Content.css';
//import ReactPlayer from 'react-player';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const Content = (props) => {

    //console.log(props.data);
    // Now from dashboard we can pass what contents need to be displayed
    // the rendering of content will be done in this section
    const toggleSaved = () => {
        console.log("Saved state changed");
        
    }

    return (        
        <div className = "content">
            <div className = "heading">
                <h2>{props.heading}</h2>
            </div>
            {/* image div */}
            <div>
            {props.contenttype === "Videos" ?
                (<div className = "image">
                        <iframe 
                        width="100%" 
                        height="100%"
                        margin = "auto"
                        display = "block" 
                        border-radius = "20px"
                        src={props.contentlink}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        >
                        </iframe> 
                </div>) :
                (<div className = "image">                    
                    <img src = {props.contentlink} />
                    
                    {/* https://www.youtube.com/embed/_Hp_dI0DzY4" */}

                    {/* <ReactPlayer 
                        width = '100%'
                        height = '100%'
                        url = ''/> */}
                </div>)
            }
            </div>
            

            <div className = "tag-saved">
                <div className = "tag">
                    <a>{props.tag}</a>
                </div>
                <div className = "saved" onClick = {toggleSaved}>
                    <FaRegBookmark/> 
                </div>
            </div>
            <div className = "text">
                <p> {props.text} </p>
            </div>
            <div>
            <a href = {props.redirectlink} target="_blank" >
                <button className = "buttonlink">Know More</button>
            </a>
            </div>
        </div>
    );
}
export default Content;