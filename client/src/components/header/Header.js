import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { links } from './headerConstants'
import { UserContext } from 'App'
import './header.scss'

const Header = () => {
    const { user } = useContext(UserContext)

    return (
        <header className="header">
            <div>
                {links.map(({ text, to, authRoute }) => {
                    if (authRoute && !user.username) {
                        return null;
                    }
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
            <div>
                {user.username && <span>{user.username}</span>}
                <i className="fal fa-album-collection"></i>
                {/* <i className="fal fa-turntable"></i> */}
            </div>
        </header>
    );
}

export default Header;