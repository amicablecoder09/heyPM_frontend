import React, {Fragment, useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {

    const [name , setName] = useState("");

    async function getName(){
        try {
            
            const response = await fetch("http://localhost:5000/dashboard/",{
                method: "GET",
                headers: {token: localStorage.token}
            });
            
            const parseRes = await response.json();

            setName(parseRes.user_name);

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
            <h1>Dashboard {name}</h1>
            <button className="btn btn-primary" 
            onClick= {e => logout(e)} >Logout</button>
            <ToastContainer />
        </Fragment>
    );
};

export default Dashboard;