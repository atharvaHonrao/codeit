import React, { useState, onChange } from "react";
import './navbar.css'
import logo from "../../assets/codeit-logo-light.png"

export default function Navbar() {

    return (
        <>
            <nav class="navbar">

                <div >
                    <img  className="logo" src={logo} />
                </div>

                <div>
                    <ul>
                        <li class="list"><a class="lista">Practice</a></li>
                        {/* <li class="list"><a class="lista">Tournments</a></li>
                        <li class="list"><a class="lista">Tests</a></li> */}
                        <li class="list">
                            <div className="dropdown listb">
                                <i class="fa-solid fa-user fa-lg"></i><div class="dropdown-content">
                                    <ul>
                                        <li className="listc">Profile</li>
                                        <li className="listc">Your Groups</li>
                                        <li className="listc">Attempted Questions</li>
                                        <li className="listc">Hi there</li>
                                        <li className="listc">Signout</li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                    </ul>

                </div>

            </nav>
        </>
    )
}