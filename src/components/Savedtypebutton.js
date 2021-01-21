import React from 'react'
import Styles from"./SavedStyleTypeButton.module.css";
//import { FaRetweet} from 'react-icons/fa';
import { BsArrowUpDown } from "react-icons/bs"

const Savedtypebutton = () => {
    
    const ClickedOnNewest = () =>{
        console.log("Clicked on Newest, Update the page now");
    }

    return (
        <div className = {Styles.savediv}>
            <div>
                <h4>Saved</h4>
            </div>
            <div className = {Styles.savedbuttons}>
                <div className={Styles.buttongroup}>
                    <button>Videos</button>
                    <button>Articles</button>
                    <button>Podcast</button>
                </div>
                <p onClick = {ClickedOnNewest}><BsArrowUpDown/>  Newest </p>
            </div>
        </div>
    )
}

export default Savedtypebutton;
