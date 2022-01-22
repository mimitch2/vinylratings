import React from 'react';
import { NavLink } from "react-router-dom";
import { links } from './headerConstants'
import './header.scss'

const activeStyle = {
    textDecoration: "underline"
};

const Header = () => {
    return (
        <header className="header">
            <div>
                {links.map(({ text, to }) => {
                    return (
                        <NavLink
                            key={text}
                            to={to}
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            {text}
                        </NavLink>
                    )
                })}
            </div>
            <i className="fal fa-turntable"></i>
            {/* <i className="fal fa-album-collection"></i> */}
        </header>
    );
}

export default Header;