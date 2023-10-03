import { useState } from 'react'
import '../styles/navbar.css'

export default function Navbar() {
    return (
        <nav className='nav'>
            <img src="images/logo.png" className='logo' />
            <ul className="nav-items">
                <li>i1</li>
                <li>i2</li>
                <li>i3</li>
            </ul>
        </nav>   
    )
}