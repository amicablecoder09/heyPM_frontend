import React, {Fragment, useState} from "react";    // state will collect the state
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

import {ReactComponent as LogoIcon } from "../assets/mainlogo.svg"; 
import styles from "./registerStyles.module.css"

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name} = inputs;

    const onChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    };

    const onSubmitForm = async(e) => {
        e.preventDefault()

        try {
            const body = { email, password, name};

            // by default fetch is a GET request
            const response = await fetch("http://localhost:5000/auth/register",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            if(parseRes.token){
                localStorage.setItem("token",parseRes.token)

                setAuth(true);
                //toast.success("Registered Successfully!")
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
            <div className={styles.container}> 
                <LogoIcon className={styles.logo} />
                <form onSubmit={onSubmitForm} >
                    
                    <input type = "text" name="name" placeholder="Fullname" className={styles.input} value={name} onChange={e => onChange(e) } />
                    <input type = "email" name="email" placeholder="Email" className={styles.input} value={email} onChange={e => onChange(e) } />
                    <input type = "password" name="password" placeholder="Password" className={styles.input} value={password} onChange={e => onChange(e) } />
                    <div>
                    <button className={styles.button}>Sign Up</button>
                    </div>
                </form>
                <div className={styles.seperator}>
                <h6><span> or </span></h6>
                </div>
                <div>
                    <button className={styles.linkedin}> Log in with LinkedIn </button>
                </div>
                <p className={styles.termsAndCondition}>By signing up you accept the 
                <a href="www.google.com" >Terms of Service</a> <br/> and 
                <a href="www.google.com"> Privacy Policy</a>
                </p>
                <div className={styles.footer}>
                    <p>Already have an account?
                    <Link to="/login" className={styles.login}> Log in </Link>
                    </p>
                </div>
                <ToastContainer/>
            </div>
        </Fragment>
    );
};

export default Register;