import React, { useState, useEffect, Fragment } from 'react';
import Styles from "./SavedStyles.module.css";

import Navbar from './Navbar';
import Content from './Content';

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

  const [clickAll, setClickAll] = useState(true);

  const [clickVideo, setClickVideo] = useState(false);

  const [clickArticle, setClickArticle] = useState(false);

  const [clickPodcast, setClickPodcast] = useState(false);

  const [clickNewest, setClickNewest] = useState(false);

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
        //console.error(err.message);
    }
  }

  const ClickedOnNewest = (val) =>{
    contentData.sort((a,b) => {
      return  b.content_date - a.content_date
    }).reverse();
    if (newestFilter) {
      setNewestFilter(false);
      setClickNewest(false);
    } else {
      setNewestFilter(true);
      setClickNewest(true);
    }
  }

  const empVideoFilter = () =>{

  }

  const applyfilter = (val) =>{
      if (val === "Videos") {
        setVideoFilter(true);
        setPodCastFilter(false);
        setArticlesFilter(false);
        setDefaultFilter(false);
        setClickVideo(true);
        setClickAll(false);
        setClickArticle(false);
        setClickPodcast(false);
      } else if (val === "Articles") {
        setVideoFilter(false);
        setPodCastFilter(false);
        setArticlesFilter(true);
        setDefaultFilter(false);
        setClickVideo(false);
        setClickAll(false);
        setClickArticle(true);
        setClickPodcast(false);
      } else if (val === "Podcast") {
        setVideoFilter(false);
        setPodCastFilter(true);
        setArticlesFilter(false);
        setDefaultFilter(false);
        setClickVideo(false);
        setClickAll(false);
        setClickArticle(false);
        setClickPodcast(true);
      }
      else if (val === "All") {
        setVideoFilter(false);
        setPodCastFilter(false);
        setArticlesFilter(false);
        setDefaultFilter(true);
        setClickVideo(false);
        setClickAll(true);
        setClickArticle(false);
        setClickPodcast(false);
      }
  }

  const removeBookmarkContentChild = (index) =>{
    for (var i = 0; i < contentData.length; i++) {
      if (contentData[i].content_id === index) {
        contentData.splice(i, 1);
        break;
      }
    }
    if (removeSaved) {
      setRemoceSaved(false);
    }
    else {
      setRemoceSaved(true);
    }
  }

  useEffect(()=>{
      getSavedContent();
  },[removeSaved]);


  return (
    <Fragment>
      { userID.length !== 0 &&
        <div className = "App">
          <Navbar name = {props.location.state.username} savedbutton ="dontshow" backbutton="Show"/>
          {contentData.length !== 0 ?
            (
              <div className = {Styles.outer}>
                <div className = {SavedStyles.savediv}>
                  <div>
                    <h4>My Library</h4>
                  </div>
                  <div className = {SavedStyles.savedbuttons}>
                    <div className={SavedStyles.buttongroup}>
                      {/* <button className = {clickAll ? SavedStyles.clickedsavedbuttons : SavedStyles.defaultsavedbuttons} onClick = {e => applyfilter("All")}>All</button> */}
                      <button className = {clickVideo ? SavedStyles.clickedsavedbuttons : SavedStyles.defaultsavedbuttons} onClick = {e => applyfilter("Videos")}>Videos</button>
                      <button className = {clickArticle ? SavedStyles.clickedsavedbuttons : SavedStyles.defaultsavedbuttons} onClick = {e => applyfilter("Articles")}>Articles</button>
                      <button className = {clickPodcast ? SavedStyles.clickedsavedbuttons : SavedStyles.defaultsavedbuttons} onClick = {e => applyfilter("Podcast")}>Podcast</button>
                    </div>
                      <p className = {clickNewest ? SavedStyles.clickednewestbuttons : SavedStyles.defaultnewestbuttons}
                      onClick = {e => ClickedOnNewest("Newest")}><BsArrowUpDown/>  Newest </p>
                  </div>
                </div>

                { (defaultFilter && !newestFilter) &&
                  <div>
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
                        isSavedPage = {true}
                        removeBookmarkContentChild = {removeBookmarkContentChild}
                        />
                      ))
                    }
                  </div>
                }

                { (videoFilter && !newestFilter) &&
                  (<div>{contentData.filter(content =>
                    content.content_type.includes('Videos')).length > 0 ?
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Videos')).map(filterContent => (
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
                            />
                        ))
                      }
                    </div> : <div className = {Styles.center}><p>Nothing to show</p> </div>
                  }</div>)
                }

                { (articlesFilter && !newestFilter) &&
                  (<div>{contentData.filter(content =>
                    content.content_type.includes('Articles')).length > 0 ?
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Articles')).map(filterContent => (
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
                            />
                        ))
                      }
                    </div> : <div className = {Styles.center}><p>Nothing to show</p> </div>
                  }</div>)
                }

                { (podcastFilter && !newestFilter) &&
                  (<div>{contentData.filter(content =>
                    content.content_type.includes('Podcast')).length > 0 ?
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Podcast')).map(filterContent => (
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
                            />
                        ))
                      }
                    </div> : <div className = {Styles.center}><p>Nothing to show</p> </div>
                  }</div>)
                }

                { (defaultFilter && newestFilter) &&
                  <div>
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
                          isSavedPage = {true}
                          removeBookmarkContentChild = {removeBookmarkContentChild}
                          />
                      ))
                    }
                  </div>
                }

                { (videoFilter && newestFilter) &&
                  (<div>{contentData.filter(content =>
                    content.content_type.includes('Videos')).length > 0 ?
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Videos')).map(filterContent => (
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
                            />
                        ))
                      }
                    </div> : <div className = {Styles.center}><p>Nothing to show</p> </div>
                  }</div>)
                }

                { (articlesFilter && newestFilter) &&
                  (<div>{contentData.filter(content =>
                    content.content_type.includes('Articles')).length > 0 ?
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Articles')).map(filterContent => (
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
                            />
                        ))
                      }
                    </div> : <div className = {Styles.center}><p>Nothing to show</p> </div>
                  }</div>)
                }

                { (podcastFilter && newestFilter) &&
                  (<div>{contentData.filter(content =>
                    content.content_type.includes('Podcast')).length > 0 ?
                    <div>
                      {contentData.filter(content =>
                        content.content_type.includes('Podcast')).map(filterContent => (
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
                            />
                        ))
                      }
                    </div> : <div className = {Styles.center}><p>Nothing to show</p> </div>
                  }</div>)
                }

              </div>
            ) :
            (<div className = {Styles.center}><p>No content is bookmarked</p> </div>)
          }
        </div>
      }
    </Fragment>
  );


}
export default Saved;
