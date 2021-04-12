import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      photo: '', 
      error: '',
      success: false
    })

    initializeLoginFramework()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };
  
    
    const googleSignIn = () => {
      handleGoogleSignIn().then(res => {
        handleResponse(res, true)
      })
    }

    const signOut = () => {
      handleSignOut().then(res => {
        handleResponse(res, false)
      })
    }

    const facebookSignIn = () => {
      handleFacebookSignIn().then(res => {
        handleResponse(res, true)
      })
    }

    const handleBlur = (e) => {
      const inputName = e.target.name;
      const inputValue = e.target.value;
      let isFieldValid = true;
      if(inputName === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(inputValue);
      }
      if(inputName === 'password'){
        const isPasswordHasNumber = /\d{1}/.test(inputValue);
        const isPasswordValid = inputValue.length > 6;
        isFieldValid = isPasswordValid && isPasswordHasNumber
      }
      if(isFieldValid){
        const newUserInfo = {...user}
        newUserInfo[inputName] = inputValue;
        setUser(newUserInfo)
      }
    }

    const handleResponse = (res, redirect) => {
      setUser(res)
      setLoggedInUser(res);
      if(redirect){
        history.replace(from)
      }
    }
  
    const handleSubmit = (e) => {
      if(newUser && user.password && user.email){
        createUserWithEmailAndPassword(user.name, user.email, user.password).then(res => {
          handleResponse(res, true)
        })
      }
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password).then(res => {
          handleResponse(res, true)
        })
      }
      e.preventDefault()
    }
  
    
    return (
        <div style={{textAlign: 'center'}}>
            {
                user.isSignedIn ? <button onClick={signOut}>Sign Out</button> 
                : <button onClick={googleSignIn}>Continue With Google</button>
            }
            <br/>
            <button onClick={facebookSignIn}>Continue With Facebook</button>
            {
                user.isSignedIn && 
                <div>
                <img src={user.photo} alt={user.name}/>
                <h3>Welcome, {user.name}</h3>
                <h4>Your Email: {user.email}</h4>
                </div>
            }

            <h1>Our Own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
            <label htmlFor="newUser">New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                { newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name"/>}
                <br/>
                <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required/>
                <br/>
                <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required/>
                <br/>
                <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
            </form>
            <p style={{color: 'red'}}>{user.error}</p>
            { user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p> }
        </div>
    );
};

export default Login;