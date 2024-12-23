import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page</p>
            <NavLink to={'logIn'} className={'btn btn-primary'}>logIn</NavLink>
            <NavLink to={'register'} className={'btn btn-primary'}>Register</NavLink>
        </div>
    );
};

export default Home;