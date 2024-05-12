import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './App.css';
import '../styles/Sidebar.css'
import codeitlogo from '../assets/codeit-logo-light.png'
import { signOut } from "firebase/auth";
import { auth } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';




function Sidebar() {
    const navigate = useNavigate();
    const PracticePage = () => <div>Practice Page</div>;
    const Groups = () => <div>Groups</div>;
    const SignOut = () => <div>Sign Out</div>;

    const logOut = () => {
        signOut(auth).then(() => {
            // console.log("Signed out")
            alert("Signed out")
            navigate('/login')
        }).catch((error) => {
            alert("Error Signing out")
        });
        // console.log("Signed out")
    }

    return (
        <div className="sidebar">
            <div className='sidebarimg'>
                <img src={codeitlogo} alt="" className='codeitlogo' />
            </div>
            <div className='sidebartop flex'>
                <div>
                    <Link to="/practice">Practice Page</Link>
                </div>
                <div>
                    <Link to="/groups">Groups</Link>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => {
                    logOut()
                }}>
                    Log Out
                </div>
            </div>

        </div>
    );
}

export default Sidebar