import React, {Fragment, useState, useEffect } from 'react';
import Content from "./Content"


const Singlecontent = (props) => {

    // Now from dashboard we can pass what contents need to be displayed
    // the rendering of content will be done in this section

    const [contentData, setContentData] = useState([]);
    const [bookmarkID, setBookmarkID] = useState([]);

    async function getAllContent(){
        try {
            const response = await fetch("https://heypm-backend.herokuapp.com/getContent",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            const contentRes = await response.json();

            //setContentData(contentRes);
            try {
                // to get content id bookmarked by the user today
                const userid = props.userid;
                const body = {userid};
                const bookmarkIdResponse = await fetch("https://heypm-backend.herokuapp.com/getbookmarkID", {
                    method: "POST",
                    headers:{"Content-Type": "application/json", token:localStorage.token},
                    body: JSON.stringify(body)
                });
                const bookmarkIdRes =await bookmarkIdResponse.json();
                setBookmarkID(bookmarkIdRes);
                if (bookmarkID.length === 0) {
                    setContentData(contentRes);
                  } else {
                    for (var i = 0; i < contentRes.length; i++) {
                      let flag = false;
                      for (var j = 0; j < bookmarkID.length; j++) {
                        if (contentRes[i].content_id === bookmarkID[j].content_id) {
                          flag = true;
                          setContentData([ ...contentData, {
                            isbookmarked: true,
                            source_name: contentRes[i].source_name,
                            content_type: contentRes[i].content_type,
                            title: contentRes[i].title,
                            content_link: contentRes[i].content_link,
                            tags: contentRes[i].tags,
                            content_body: contentRes[i].content_body,
                            source_link: contentRes[i].source_link,
                            content_id: contentRes[i].content_id
                          }]);
                          break;
                        }
                      }
                      if (!flag) {
                        setContentData([ ...contentData, {
                          isbookmarked: false,
                          source_name: contentRes[i].source_name,
                          content_type: contentRes[i].content_type,
                          title: contentRes[i].title,
                          content_link: contentRes[i].content_link,
                          tags: contentRes[i].tags,
                          content_body: contentRes[i].content_body,
                          source_link: contentRes[i].source_link,
                          content_id: contentRes[i].content_id
                        }]);
                      }
                    }
                  }

            } catch (err) {
                //console.log(err.message);
            }

        } catch (err) {
            //console.error(err.message);
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
              isbookmarked = {content.isbookmarked}
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
