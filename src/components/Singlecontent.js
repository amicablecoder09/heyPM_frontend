import React, {Fragment, useState, useEffect } from 'react';
import Content from "./Content"


const Singlecontent = (props) => {

    // Now from dashboard we can pass what contents need to be displayed
    // the rendering of content will be done in this section

    const [contentData, setContentData] = useState([]);

    async function getAllContent(){
        try {
            const response = await fetch("https://heypm-backend.herokuapp.com/getContent",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            const contentRes = await response.json();
            // console.log(contentRes);
            setContentData(contentRes);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getAllContent();
    },[]);

    return (
        <Fragment>
        {contentData.length === 3 &&
        <div>
          {contentData.map(content =>(
            <Content
                key = {content.content_id}
              userid ={props.userid}
              contentButtonName = {content.source_name}
              contenttype = {content.content_type}
              heading = {content.title}
              contentlink = {content.content_link}
              tag = {content.tags}
              text = {content.content_body}
              redirectlink = {content.source_link}
              contentID = {content.content_id}
              />
          ))}
        </div>
      }
        </Fragment>
    );
}
export default Singlecontent;