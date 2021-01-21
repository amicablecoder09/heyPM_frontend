//import logo from './logo.svg';
import './App.css';

import {Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from "react-router-dom";

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Components
import Intro from "./components/Intro"

import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"
import Saved from "./components/Saved";



function App() {

  const[isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }
  
  async function isAuth() {
    try {
      
      const response = await fetch("https://heypm-backend.herokuapp.com/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      });
      
      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true) : 
      setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    isAuth()
  })

  {/* Yatin code  className="container" */}
  

  return (
  <Fragment>
    
    <Router>         
      <div >   
      <Switch>
        <Route exact path="/" 
        render = {props => !isAuthenticated ? 
        (<Intro {...props} setAuth = {setAuth} />) : (<Redirect to ="/dashboard" />) } />

        <Route exact path="/login" 
        render = {props => !isAuthenticated ? 
        (<Login {...props} setAuth = {setAuth} />) : (<Redirect to ="/dashboard" />) } />

        <Route exact path="/register" 
        render = {props => !isAuthenticated ? 
        (<Register {...props} setAuth = {setAuth} />) : (<Redirect to ="/login" />) } />
        
        <Route exact path="/dashboard" 
        render = {props => isAuthenticated ? 
        (<Dashboard {...props} setAuth = {setAuth} />) : (<Redirect to ="/login" />) } />

        <Route exact path="/saved" 
        render = {props => isAuthenticated ? 
        (<Saved {...props} setAuth = {setAuth} />) : (<Redirect to ="/login" />) } />

      </Switch> 
      </div>
      
    </Router> 
  </Fragment>
  );
}

export default App;
