import React from 'react';
import { NavLink } from "react-router-dom";
import './header.scss'


const Header = () => {
    return (
        <header className="header">
            <div>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/">Main</NavLink>
            </div>
            <i className="fal fa-turntable"></i>
            <i className="fal fa-album-collection"></i>
        </header>
    );
}

export default Header;