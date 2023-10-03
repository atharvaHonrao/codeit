import React, { useState, onChange } from "react";
import { Link } from 'react-router-dom';
import '../lPage.css';
import { Cards } from './ctas';  

// import { SignUp, EditorCTA } from './ctas'; 

// import code from '.../images/coding.png'
// import Navbar from './navbar'


export default function LandingPage() {
    return (
        <div>
            {/* <Navbar/> */}
            <div className="attract">
                <p className="attract-text">1,2,3...</p>
            </div>

            <div className="colour-change">
                <Cards />
                {/* <SignUp />
                <EditorCTA /> */}
            </div>

            <InfoCarousel />
        </div>
    );
}