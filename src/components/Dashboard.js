import React, {Fragment, useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./Navbar"
import styles from "./dashboardStyles.module.css";
import Content from "./Content"
import Singlecontent from "./Singlecontent";


const Dashboard = ({ setAuth }) => {

    const [name , setName] = useState("");
    
    // // Yatin code
    // const [usersState, setUsersState] = useState(
    //   [
    //     {
    //       heading : 'lets check it first',
    //       imagelink : 'data:image/jpeg;base64,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',
    //       tag : 'UX Design',
    //       text : "Product management is an organisational function within a company dealing with new product development, business justification, planning, verification, forecasting, pricing, product launch, and marketing of a product or products at all stages of the product lifecycle ",
    //       redirectlink : 'https://www.google.com/'
    //     },
    //     {
    //       heading : 'People ignore design that ignores people',
    //       imagelink : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIcjoBSDysoAFawjud4TY5curtYYYm3lne8g&usqp=CAU',
    //       tag : 'Material Design',
    //       text : "Product management is an organisational function within a company dealing with new product development, business justification, planning, verification, forecasting, pricing, product launch, and marketing of a product or products at all stages of the product lifecycle ",
    //       redirectlink : ''
    //     },
    //     {
    //       heading : 'Design isn’t finished until somebody is using it',
    //       imagelink : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLu-vt52zANpc5LYQiBYAe7K1UcY7cvjIRw&usqp=CAU',
    //       tag : 'UI Design',
    //       text : "Product management is an organisational function within a company dealing with new product development, business justification, planning, verification, forecasting, pricing, product launch, and marketing of a product or products at all stages of the product lifecycle ",
    //       redirectlink : ''
    //     }
    //   ]
    // );

    async function getName(){
        try {
            const response = await fetch("https://heypm-backend.herokuapp.com/dashboard/",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();

            const fullname = parseRes.user_name;
            const name = fullname.split(" ")[0];
            setName(name);
            // try {
            //   const response = await fetch("https://heypm-backend.herokuapp.com/getContent",{
            //       method: "GET",
            //       headers: {token: localStorage.token}
            //   });
            //   const contentRes = await response.json();
            //   console.log(contentRes[0].content_heading);
            //   // .content[0].heading = contentRes[0].content_heading;
            //   // setUsersState(
            //   const handleAdd = (contentRes) => {
            //     setUsersState([...usersState, contentRes]);
            //   }
            //   console.log(usersState);
            //   console.log(contentRes);
                    
            // } catch (err) {
            //     console.error(err.message);
            // }
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast("Logged out successfully!"); // not working
    };

    useEffect(()=>{
        getName()
    },[]); // useEffect make many request 
    // by adding [] it will make only 1 request when it is rendered
    

    

    return (
      
        <Fragment>
          
          <div className="container-dashboard">
            <Navbar name = { name } />
            {/* earlier to call name we used usersState.persons[0].name */}            
            <div className = {styles.outer}>
              <Singlecontent />

            {/* <Content
              heading = {usersState.content[0].heading}
              imagelink = {usersState.content[0].imagelink}
              tag = {usersState.content[0].tag}
              text = {usersState.content[0].text}
              redirectlink = {usersState.content[0].redirectlink}
              /> */}

              {/* <button className={styles.logout} 
              onClick= {e => logout(e)} >Logout
              </button>  */}

            </div>
            <ToastContainer />
          </div>
        </Fragment>
    );
};

export default Dashboard;