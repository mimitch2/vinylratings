import React from 'react';
import { NavLink } from "react-router-dom";
import './header.scss'


const Header = () => {
    return (
        <header className="header">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/">Main</NavLink>
        </header>
    );
}

export default Header;