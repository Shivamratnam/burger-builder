import React from 'react';
import Logo from '../../Logo/Logo';
import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
    return(
        <div className="SideDrawer">
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;
