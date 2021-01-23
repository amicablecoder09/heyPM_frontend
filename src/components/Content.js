import React, {useState, useEffect } from 'react';
import './Content.css';
//import ReactPlayer from 'react-player';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { IoArrowForward } from 'react-icons/io5';
import { toast } from 'react-toastify';

toast.configure();

const Content = (props) => {

    const [bookmark, setBookmark] = useState(false);
    const [savedPage, setSavedPage] = useState(false);

    const toggleSaved = async() => {

        const userID= props.userid;
        const contentID = props.contentID;
        const body = {userID, contentID};

        if (bookmark) {
            try {

                const response = await fetch("https://heypm-backend.herokuapp.com/removebookmarkContent",{
                    method: "POST",
                    headers: {"Content-Type": "application/json", token: localStorage.token},
                    body: JSON.stringify(body)
                });
                const contentRes = await response.json();
                toast.error(contentRes,
                  {autoClose:2000, position: toast.POSITION.BOTTOM_RIGHT});
                setBookmark(false);
                if (savedPage) {
                    props.removeBookmarkContentChild(props.contentID);
                  }

            } catch (err) {
              toast.error(err.message,
                {autoClose:2000, position: toast.POSITION.BOTTOM_RIGHT});
                //console.error(err.message);
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
                toast.success(contentRes,
                  {autoClose:2000, position: toast.POSITION.BOTTOM_RIGHT});
                setBookmark(true);

            } catch (err) {
                toast.error(err.message,
                  {autoClose:2000, position: toast.POSITION.BOTTOM_RIGHT});
                //console.error(err.message);
            }
        }
    }

    useEffect(()=>{
        setBookmark(props.isbookmarked);
        setSavedPage(props.isSavedPage);
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
                        title="No title set"
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
                    <img src = {props.contentlink} alt="" />

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
                    <a > { props.tag } </a>
                </div>
                <div className = "saved" onClick = {toggleSaved}>
                {bookmark === true ?  (<FaBookmark/>) : (<FaRegBookmark/>) }
                </div>
            </div>
            <div className = "text">
                <p> {props.text} </p>
            </div>
            <div  className="wrapper">
                <a href = {props.redirectlink} target="_blank" rel="noreferrer" >
                    <button className = "buttonlink">{props.contentButtonName}
                    <IoArrowForward className="button-arrow-icon"/> </button>
                </a>
            </div>
        </div>
    );
}
export default Content;
