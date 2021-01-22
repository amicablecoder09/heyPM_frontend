import React, { useState, useEffect, Fragment } from 'react';
import Styles from "./SavedStyles.module.css";

import Navbar from './Navbar';
import Content from './Content';
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// merged SavedtypeButton and itrs css
import SavedStyles from"./SavedStyleTypeButton.module.css";
import { BsArrowUpDown } from "react-icons/bs"

const Saved = (props) => {

  const [contentData, setContentData] = useState([]);
  const [userID, setUserID] = useState("");

  const [videoFilter, setVideoFilter] = useState(false);

  const [articlesFilter, setArticlesFilter] = useState(false);

  const [podcastFilter, setPodCastFilter] = useState(false);

  const [newestFilter, setNewestFilter] = useState(false);

  const [defaultFilter, setDefaultFilter] = useState(true);

  const [removeSaved, setRemoceSaved] = useState(false);

  // const [allButton, setAllButton] = useState(true);
  const white = '#000';
  const yellow = '#FFD712';
  const [videoButton, setVideoButton] = useState({ color: white });
  // const [articleButton, setArticleButton] = useState(false);
  // const [podcastButton, setPodcastButton] = useState(false);

  // const[state, setState] = useState({ color: 'red' });

  async function getSavedContent(){
    try {
      if (!removeSaved) {
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
      }
    } 
    catch (err) {
        console.error(err.message);
    }
  }

  const ClickedOnNewest = (val) =>{
    contentData.sort((a,b) => {
      return  b.content_date - a.content_date
    }).reverse();
    if (newestFilter) {
      setNewestFilter(false);
    } else {
      setNewestFilter(true);
    }
  }

  const applyfilter = (val) =>{
      console.log(val);
      if (val === "Videos") {
        setVideoFilter(true);
        setPodCastFilter(false);
        setArticlesFilter(false);
        setDefaultFilter(false);

        // setState({ color: 'green' });
        setVideoButton({ color: yellow });
        // setAllButton(false);
        // setArticleButton(false);
        // setPodcastButton(false);        
      } else if (val === "Articles") {
        setVideoFilter(false);
        setPodCastFilter(false);
        setArticlesFilter(true);
        setDefaultFilter(false);

        // setVideoButton(false);
        // setAllButton(false);
        // setArticleButton(true);
        // setPodcastButton(false);  
      } else if (val === "Podcast") {
        setVideoFilter(false);
        setPodCastFilter(true);
        setArticlesFilter(false);
        setDefaultFilter(false);

        // setVideoButton(false);
        // setAllButton(false);
        // setArticleButton(false);
        // setPodcastButton(true);  
      }
      else if (val === "All") {
        setVideoFilter(false);
        setPodCastFilter(false);
        setArticlesFilter(false);
        setDefaultFilter(true);
      }
  }

  const removeBookmarkContentChild = (index) =>{
    console.log(index);
    console.log(contentData);
    for (var i = 0; i < contentData.length; i++) {
      if (contentData[i].content_id === index) {
        contentData.splice(i, 1);
        setRemoceSaved(true);
        console.log(contentData);
        break;
      }
    }
  }

  useEffect(()=>{
      getSavedContent();
  },[removeSaved]);



    return (
        <Fragment>
          { userID.length !== 0 &&
            <div className="App">
              <Navbar name = {props.location.state.username} savedbutton ="dontshow" backbutton="Show"/>
              {contentData.length !== 0 ?
                (<div className = {Styles.outer}>
                  <div className = {SavedStyles.savediv}>
                      <div>
                          <h4>Saved</h4>
                      </div>
                      <div className = {SavedStyles.savedbuttons}>
                          <div className={SavedStyles.buttongroup}>
                              <button onClick = {e => applyfilter("All")}>All</button>
                              <button style={{color: videoButton}} onClick = {e => applyfilter("Videos")}>Videos</button>
                              <button onClick = {e => applyfilter("Articles")}>Articles</button>
                              <button onClick = {e => applyfilter("Podcast")}>Podcast</button>
                          </div>
                          <p onClick = {e => ClickedOnNewest("Newest")}><BsArrowUpDown/>  Newest </p>
                      </div>
                  </div>

                  { (defaultFilter && !newestFilter) &&
                    <div>
                      {contentData.map((content, index) =>(
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
                            isSavedPage = {true}
                            removeBookmarkContentChild = {removeBookmarkContentChild}
                            index= {index}
                            />
                        ))
                      }
                    </div>
                  }

                  { (videoFilter && !newestFilter) &&
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Videos')).map((filterContent,index) => (
                          <Content
                            key = {filterContent.content_id}
                            isbookmarked = {true}
                            userid ={props.location.state.userid}
                            contentButtonName = {filterContent.source_name}
                            contenttype = {filterContent.content_type}
                            heading = {filterContent.title}
                            contentlink = {filterContent.content_link}
                            tag = {filterContent.tags}
                            text = {filterContent.content_body}
                            redirectlink = {filterContent.source_link}
                            contentID = {filterContent.content_id}
                            isSavedPage = {true}
                            removeBookmarkContentChild = {removeBookmarkContentChild}
                            index= {index}
                            />
                        ))
                      }
                    </div>
                  }
                  { (articlesFilter && !newestFilter) &&
                    <div>
                    {contentData.filter(content =>
                      content.content_type.includes('Articles')).map((filterContent,index) => (
                        <Content
                          key = {filterContent.content_id}
                          isbookmarked = {true}
                          userid ={props.location.state.userid}
                          contentButtonName = {filterContent.source_name}
                          contenttype = {filterContent.content_type}
                          heading = {filterContent.title}
                          contentlink = {filterContent.content_link}
                          tag = {filterContent.tags}
                          text = {filterContent.content_body}
                          redirectlink = {filterContent.source_link}
                          contentID = {filterContent.content_id}
                          isSavedPage = {true}
                          removeBookmarkContentChild = {removeBookmarkContentChild}
                          index= {index}
                          />
                      ))
                    }
                    </div>
                  }
                  { (podcastFilter && !newestFilter) &&
                    <div>
                    {contentData.filter(content =>
                      content.content_type.includes('Podcast')).map((filterContent,index) => (
                        <Content
                          key = {filterContent.content_id}
                          isbookmarked = {true}
                          userid ={props.location.state.userid}
                          contentButtonName = {filterContent.source_name}
                          contenttype = {filterContent.content_type}
                          heading = {filterContent.title}
                          contentlink = {filterContent.content_link}
                          tag = {filterContent.tags}
                          text = {filterContent.content_body}
                          redirectlink = {filterContent.source_link}
                          contentID = {filterContent.content_id}
                          isSavedPage = {true}
                          removeBookmarkContentChild = {removeBookmarkContentChild}
                          index= {index}
                          />
                      ))
                    }
                    </div>
                  }

                  { (defaultFilter && newestFilter) &&
                    <div>
                      {contentData.map((content, index) =>(
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
                            isSavedPage = {true}
                            removeBookmarkContentChild = {removeBookmarkContentChild}
                            index= {index}
                            />
                        ))
                      }
                    </div>
                  }

                  { (videoFilter && newestFilter) &&
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Videos')).map((filterContent,index) => (
                          <Content
                            key = {filterContent.content_id}
                            isbookmarked = {true}
                            userid ={props.location.state.userid}
                            contentButtonName = {filterContent.source_name}
                            contenttype = {filterContent.content_type}
                            heading = {filterContent.title}
                            contentlink = {filterContent.content_link}
                            tag = {filterContent.tags}
                            text = {filterContent.content_body}
                            redirectlink = {filterContent.source_link}
                            contentID = {filterContent.content_id}
                            isSavedPage = {true}
                            removeBookmarkContentChild = {removeBookmarkContentChild}
                            index= {index}
                            />
                        ))
                      }
                    </div>
                  }

                  { (articlesFilter && newestFilter) &&
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Articles')).map((filterContent,index) => (
                          <Content
                            key = {filterContent.content_id}
                            isbookmarked = {true}
                            userid ={props.location.state.userid}
                            contentButtonName = {filterContent.source_name}
                            contenttype = {filterContent.content_type}
                            heading = {filterContent.title}
                            contentlink = {filterContent.content_link}
                            tag = {filterContent.tags}
                            text = {filterContent.content_body}
                            redirectlink = {filterContent.source_link}
                            contentID = {filterContent.content_id}
                            isSavedPage = {true}
                            removeBookmarkContentChild = {removeBookmarkContentChild}
                            index= {index}
                            />
                        ))
                      }
                    </div>
                  }

                  { (podcastFilter && newestFilter) &&
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Podacst')).map((filterContent,index) => (
                          <Content
                            key = {filterContent.content_id}
                            isbookmarked = {true}
                            userid ={props.location.state.userid}
                            contentButtonName = {filterContent.source_name}
                            contenttype = {filterContent.content_type}
                            heading = {filterContent.title}
                            contentlink = {filterContent.content_link}
                            tag = {filterContent.tags}
                            text = {filterContent.content_body}
                            redirectlink = {filterContent.source_link}
                            contentID = {filterContent.content_id}
                            isSavedPage = {true}
                            removeBookmarkContentChild = {removeBookmarkContentChild}
                            index= {index}
                            />
                        ))
                      }
                    </div>
                  }

                </div>): (<div>No content is bookmarked! </div>)

              }
              </div>
          }
        </Fragment>
    );
}

export default Saved;