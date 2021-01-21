import React, {useState, useEffect } from 'react';
import './Content.css';
//import ReactPlayer from 'react-player';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { IoArrowForward } from 'react-icons/io5';


const Content = (props) => {

    //console.log(props.data);
    // Now from dashboard we can pass what contents need to be displayed
    // the rendering of content will be done in this section
    const [bookmark, setBookmark] = useState(false);

    const toggleSaved = async() => {

        console.log("Saved state changed");
        
        const userID= props.userid;
        const contentID = props.contentID;

        const body = {userID, contentID};

        console.log(body);
        if (bookmark) {
            try {

                const response = await fetch("https://heypm-backend.herokuapp.com/removebookmarkContent",{
                    method: "POST",
                    headers: {"Content-Type": "application/json", token: localStorage.token},
                    body: JSON.stringify(body)
                });
                const contentRes = await response.json();
                // Toast is needed
                console.log(contentRes);
                setBookmark(false);
    
            } catch (err) {
                console.error(err.message);
            }
        }
        else{
            try {
                const response = await fetch("https://heypm-backend.herokuapp.com/bookmarkContent",{
                    method: "POST",
                    headers: {"Content-Type": "application/json", token: localStorage.token},
                    body: JSON.stringify(body)
                });
                const contentRes = await response.json();
                // Toast is needed
                console.log(contentRes);
                setBookmark(true);
    
            } catch (err) {
                console.error(err.message);
            }
        }
        
    }
    
    useEffect(()=>{
        setBookmark(props.isbookmarked);
    },[]); 

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
                {bookmark === true ?  (<FaBookmark/>) : (<FaRegBookmark/>) } 
                </div>
            </div>
            <div className = "text">
                <p> {props.text} </p>
            </div>
            <div  className="wrapper">
                <a href = {props.redirectlink} target="_blank" >
                    <button className = "buttonlink">{props.contentButtonName}
                    <IoArrowForward className="button-arrow-icon"/> </button>
                </a>
            </div>
        </div>
    );
}
export default Content;