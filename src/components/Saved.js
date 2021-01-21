import React, { useState, useEffect } from 'react';
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
          console.log(JSON.stringify(body))
      
          const response = await fetch("https://heypm-backend.herokuapp.com/getbookmarkContent",{
              method: "POST",
              headers: {"Content-Type": "application/json", token: localStorage.token},
              body: JSON.stringify(body)
          });
          const contentRes = await response.json();
          
          console.log(response.json);
          console.log(contentRes);

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
        <div>
          { userID.length !== 0 &&
            <div className="App">
              <Navbar name = "" savedbutton ="dontshow"/>
                <div className = {Styles.outer}>
                
                  {/* <Route path = '/Savedtypebutton' component = {Savedtypebutton}/> */}
                  <Savedtypebutton />

                  <Route >                
                  {/* <Content
                    heading = {usersState.content[0].heading}
                    imagelink = {usersState.content[0].imagelink}
                    tag = {usersState.content[0].tag}
                    text = {usersState.content[0].text}
                    redirectlink = {usersState.content[0].redirectlink}
                    /> */}


                  </Route>
                </div>

              </div>
          } 
        </div>
    );
}

export default Saved;
