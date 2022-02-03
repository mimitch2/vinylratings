import React, { useState, useContext } from 'react';
import { UserContext } from 'App'
import { apiService } from 'services';
import './home.scss'
const Home = () => {
    const { user } = useContext(UserContext);

    const renderLogin = () => {
        return (
            <div>
                <h1>Hold on there, looks like ya need to log in</h1>
                <button type="button" onClick={async () => {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/discogs/auth`);
                    const redirectTo = await response.text()
                    window.location = redirectTo;
                }}>
                    CLICK
                </button>
            </div>
        )
    };

    const renderAuthorized = () => {
        return (
            <h1>Sweeet! Now you should rate some vinyl!</h1>
        )
    }
    return (
        <div className="home--wrapper">
            {
                user?.username ? renderAuthorized() : renderLogin()
            }
        </div>
    );
}

export default Home;
