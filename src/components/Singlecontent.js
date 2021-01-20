import React, {Fragment, useState, useEffect } from 'react';
import Content from "./Content"


const Singlecontent = (props) => {

    // Now from dashboard we can pass what contents need to be displayed
    // the rendering of content will be done in this section
    const [contentType, setContentType] = useState("");
    const [contentHeading , setContentHeading] = useState("");
    const [contentImageLink, setContentImageLink] = useState("");
    const [contentTag, setContentTag] = useState("");
    const [contentText, setContentText] = useState("");
    const [contentSourceLink, setContentSourceLink ] = useState("");

    const [contentType1, setContentType1] = useState("");
    const [contentHeading1 , setContentHeading1] = useState("");
    const [contentImageLink1, setContentImageLink1] = useState("");
    const [contentTag1, setContentTag1] = useState("");
    const [contentText1, setContentText1] = useState("");
    const [contentSourceLink1, setContentSourceLink1 ] = useState("");

    const [contentType2, setContentType2] = useState("");
    const [contentHeading2 , setContentHeading2] = useState("");
    const [contentImageLink2, setContentImageLink2] = useState("");
    const [contentTag2, setContentTag2] = useState("");
    const [contentText2, setContentText2] = useState("");
    const [contentSourceLink2, setContentSourceLink2 ] = useState("");
    

    async function getAllContent(){
        try {
            const response = await fetch("https://heypm-backend.herokuapp.com/getContent",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            const contentRes = await response.json();
            console.log(contentRes);

            setContentType( contentRes[0].content_type);
            setContentHeading( contentRes[0].title);
            setContentImageLink( contentRes[0].content_link);
            setContentTag( contentRes[0].tags);
            setContentText( contentRes[0].content_body);
            setContentSourceLink( contentRes[0].source_link);

            setContentType1( contentRes[1].content_type);
            setContentHeading1( contentRes[1].title);
            setContentImageLink1( contentRes[1].content_link);
            setContentTag1( contentRes[1].tags);
            setContentText1( contentRes[1].content_body);
            setContentSourceLink1( contentRes[1].source_link);

            setContentType2( contentRes[2].content_type);
            setContentHeading2( contentRes[2].title);
            setContentImageLink2( contentRes[2].content_link);
            setContentTag2( contentRes[2].tags);
            setContentText2( contentRes[2].content_body);
            setContentSourceLink2( contentRes[2].source_link);
                        
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getAllContent();
    },[]);
    

    return (    
        <Fragment>    
        <div >
            <Content
              contenttype = {contentType}
              heading = {contentHeading}
              contentlink = {contentImageLink}
              tag = {contentTag}
              text = {contentText}
              redirectlink = {contentSourceLink}
              />

            <Content
              contenttype = {contentType1}
              heading = {contentHeading1}
              contentlink = {contentImageLink1}
              tag = {contentTag1}
              text = {contentText1}
              redirectlink = {contentSourceLink1}
              />

            <Content
              contenttype = {contentType2}
              heading = {contentHeading2}
              contentlink = {contentImageLink2}
              tag = {contentTag2}
              text = {contentText2}
              redirectlink = {contentSourceLink2}
              />
                     
        </div>
        </Fragment>
    );
}
export default Singlecontent;