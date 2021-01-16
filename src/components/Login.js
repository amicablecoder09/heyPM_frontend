import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

import {ReactComponent as LogoIcon } from "../assets/mainlogo.svg"; 
import "./loginStyles.css";

const Login = ( {setAuth} ) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password} = inputs;

    const onChange= (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            
            const body = {email, password};

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            // localStorage.setItem("token",parseRes.token);
            // setAuth(true);
            if(parseRes.token){
                localStorage.setItem("token",parseRes.token);
                setAuth(true);                
                // doen't make sense to display toast on login
                //toast.success("success");
            }
            else{
                setAuth(false);
                toast.error(parseRes);          
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    

    return (
        <Fragment>
            <div className="container">
                <LogoIcon className="logo"/>
                <form onSubmit={onSubmitForm}>
                    <input type="email" name="email" placeholder="Email" 
                    className="input" value={email} onChange={e => onChange(e)} />
                    
                    <input type="password" name="password" placeholder="Password" 
                    className="input" value={password} onChange={e => onChange(e)} />
                    
                    <div>
                    <button className="button">Log in</button>
                    </div>    
                </form>
                <div className="forgot-password">
                    Forgot Password?
                </div>
                <div className="seperator">
                <h6><span> or </span></h6>
                </div>
                <div>
                    <button className="linkedin"> Log in with LinkedIn </button>
                </div>
                <div className="footer">
                    <p>Don’t have an account? 
                    <Link to="/register" className="signup"> Sign Up </Link>
                    </p>
                </div>
                <ToastContainer />
            </div>
        </Fragment>
    );
};

export default Login;

// inline style to call | style = {Heading} |
// const Heading = { 
//     color: 'blue'
// }

