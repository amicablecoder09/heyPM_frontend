import React, {Fragment, useState, useEffect } from "react";

// import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./Navbar"
import styles from "./dashboardStyles.module.css";
import Singlecontent from "./Singlecontent";


const Dashboard = ({ setAuth }) => {

    const [name , setName] = useState("");
    const [userID , setUserId] = useState("");

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
            setUserId(parseRes.user_id);
        } catch (err) {
            console.error(err.message);
        }
    }

    // const logout = (e) =>{
    //     e.preventDefault();
    //     localStorage.removeItem("token");
    //     setAuth(false);
    //     toast("Logged out successfully!"); // not working
    // };

    useEffect(()=>{
        getName()
    },[]); // useEffect make many request 
    // by adding [] it will make only 1 request when it is rendered

    return (
      
        <Fragment>
          { userID.length !== 0 &&
            <div className="container-dashboard">
              
              <Navbar name = { name } savedbutton ="Show" userid ={ userID } backbutton="dont show" />
              {/* earlier to call name we used usersState.persons[0].name */}            
              <div className = {styles.outer}>              
                <Singlecontent userid ={ userID } />
                {/* <button className={styles.logout} 
                onClick= {e => logout(e)} >Logout
                </button>  */}
              </div>
              {/* <ToastContainer /> */}
            </div>
          }
        </Fragment>
    );
};

export default Dashboard;