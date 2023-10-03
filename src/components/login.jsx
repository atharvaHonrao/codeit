import React, { useState } from 'react';
import '../App.css';
import mainImg from '../assets/codeit-logo.png'
// import './bg-main.css'
import '../styles/signup.css'
import {login} from '../utilities/Login'
import { useNavigate } from 'react-router-dom';
import {useAuthValue} from '../utilities/AuthContext'
import { auth, db } from "../utilities/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {redirect} from 'react-router-dom'
import { writeBatch, doc, addDoc, collection } from 'firebase/firestore';

export default function Login() {

    // async function importJSONToFirestore(collectionName, jsonArray) {
    //     try {
    //     const batch = writeBatch(db);
    //       jsonArray.forEach((jsonObject) => {
    //         // Generate a new document reference for each JSON object
    //         addDoc(collection(db, collectionName), jsonObject);
    //         // batch.set(newDocRef, jsonObject);
    //       });
      
    //       // Commit the batch
    //     //   await batch.commit();
      
    //       console.log('Import completed successfully.');
    //     } catch (error) {
    //       console.error('Error importing data to Firestore:', error);
    //     }
    //   }
      
      // Example usage
      
      
      
      
      const collectionName = 'problems'; // Replace with your desired collection name
      
      

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const {currentUser} = useAuthValue()
    // console.log(loginData.email)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const login = async (email, password, e) => {
        // e.preventDefault();
      //   setError("");
        //   debugger
          signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
            //   debugger
              console.log(res.user);
              debugger
              navigate('/dashboard')
            })
            .catch((err) => alert(err.message));
        
      //   setEmail("");
      //   setPassword("");
      //   setConfirmPassword("");
      };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const { email, password } = loginData;


    //     const params = new URLSearchParams();
    //     params.append('email', email);
    //     params.append('password', password);

    //     const url = `register?${params}`;

    //     let postReq = await fetch(url)
    //     console.log("hiiii")
    //     let res = await postReq.json()
    //     console.log('Logged in with', res.body);
    // };

    return (
        <div className='signup-mainbody flex'>
            <div className='signup-image-container flex'>
                <div className='signup-image-title'>
                    <h2>Start Scripting Your Success Story with</h2>
                </div>
                <div>
                    <img src={mainImg} className="main-img" alt="Main Background" />
                </div>
            </div>
            <div className="signup-container">
                <h2 className='signup-title'>Login Now</h2>
                <div  className="flex login-form">
                    <div className='form-el'>
                        <label htmlFor="email">Email Address:</label>
                        <input
                            placeholder='Enter Your Email address'
                            type="email"
                            id="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='form-el'>
                        <label htmlFor="password">Password:</label>
                        <input
                            placeholder='Enter Password'
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="btn-container">
                        <div>
                            <button className='signup-btn' onClick={ (e) => {
                    // debugger
                    login(loginData.email, loginData.password)
                    // debugger
                }}>Login</button>
                        </div>
                    </div>
                </div>
                <h4 className='or'> or </h4>
                <div className='google-btn'>
                    <button className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                        </svg>
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
}