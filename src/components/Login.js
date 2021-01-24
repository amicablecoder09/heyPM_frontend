import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

import {ReactComponent as LogoIcon } from "../assets/mainlogo.svg";
import styles from "./loginStyles.module.css";
import GoogleLogin from "react-google-login";

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

            const response = await fetch("https://heypm-backend.herokuapp.com/auth/login", {
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
            //console.error(err.message);
        }
    }

    const responseSuccessGoogle = async(response) => {
    
        const body = {tokenId: response.tokenId};

        try {
            const dbResponse = await fetch("https://heypm-backend.herokuapp.com/auth/googlelogin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });           

            const dbParseRes = await dbResponse.json();
            if(dbParseRes.token){
                localStorage.setItem("token",dbParseRes.token);
                setAuth(true);
            }
            else{
                setAuth(false);
                toast.error(dbParseRes);
            }
        } 
        catch (err) {
            console.log(err.message);
        }
    } 

    const responseErrorGoogle = (response) => {

    }


    return (
        <Fragment>
            <div className={styles.container}>
                <LogoIcon className={styles.logo}/>
                <form onSubmit={onSubmitForm}>
                    <input type="email" name="email" placeholder="Email"
                    className={styles.input} value={email} onChange={e => onChange(e)} />

                    <input type="password" name="password" placeholder="Password"
                    className={styles.input} value={password} onChange={e => onChange(e)} />

                    <div>
                    <button className={styles.button}>Log in</button>
                    </div>
                </form>
                <div className={styles.forgotPassword}>
                    Forgot Password?
                </div>
                <div className={styles.seperator}>
                <h6><span> or </span></h6>
                </div>
                <div>
                    {/* <button className={styles.linkedin}> Log in with LinkedIn </button> */}
                    <GoogleLogin
                    className= {styles.googlelogin}
                        clientId="1076435734338-q2ntmvrh08r1m7vl96va9n39l2ke1el1.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                <div className={styles.footer}>
                    <p>Don’t have an account?
                    <Link to="/register" className={styles.signup}> Sign Up </Link>
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
