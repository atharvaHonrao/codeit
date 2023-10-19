import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './App.css';
import '../styles/Sidebar.css'
import codeitlogo from '../assets/Codeit-logo-light.png'
function Sidebar() {
    const PracticePage = () => <div>Practice Page</div>;
    const Groups = () => <div>Groups</div>;
    const SignOut = () => <div>Sign Out</div>;
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
                <div>
                    <Link to="/signout">Sign Out</Link>
                </div>
            </div>
            
        </div>
    );
}

export default Sidebar