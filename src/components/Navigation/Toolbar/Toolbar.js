import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    
    return (
        <header className="Toolbar">
            <div>MENU</div>
            <Logo />
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
        </header>
    );
};

export default toolbar;
