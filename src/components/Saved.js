import React, { useState, useEffect, Fragment } from 'react';
import Styles from "./SavedStyles.module.css";

import Navbar from './Navbar';
import Content from './Content';
import Savedtypebutton from './Savedtypebutton';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const Saved = (props) => {

  const [contentData, setContentData] = useState([]);

  const [userID, setUserID] = useState("");

  async function getSavedContent(){ 
    try {
          const userid = props.location.state.userid; 
          const body = {userid};
      
          const response = await fetch("https://heypm-backend.herokuapp.com/getbookmarkContent",{
              method: "POST",
              headers: {"Content-Type": "application/json", token: localStorage.token},
              body: JSON.stringify(body)
          });
          const contentRes = await response.json();

          setContentData(contentRes);
          setUserID(props.location.state.userid);

      } catch (err) {
          console.error(err.message);
      }
  }

  useEffect(()=>{
      getSavedContent();
  },[]);



    return (
        <Fragment>
          { userID.length !== 0 && contentData.length !==0 &&
            <div className="App">
              <Navbar name = {props.location.state.username} savedbutton ="dontshow"/>
                <div className = {Styles.outer}>
                  <Savedtypebutton />
                  {contentData.map(content =>(
                      <Content
                          key = {content.content_id}
                          isbookmarked = {true}
                        userid ={props.location.state.userid}
                        contentButtonName = {content.source_name}
                        contenttype = {content.content_type}
                        heading = {content.title}
                        contentlink = {content.content_link}
                        tag = {content.tags}
                        text = {content.content_body}
                        redirectlink = {content.source_link}
                        contentID = {content.content_id}
                        />
                    ))
                  }

                </div>
              </div>
          } 
        </Fragment>
    );
}

export default Saved;
