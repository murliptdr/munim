import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return (
        <>
            <nav>
                <img className="navlogo" alt="logo" src="/img/logo.png"></img>
                <ul>
                    <li><Link className="litext" to="#"> Home </Link></li>
                    <li><Link className="litext" to="#"> Contact Us </Link></li>
                    <li><Link className="litext" to="/signup"> Sign up </Link></li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;