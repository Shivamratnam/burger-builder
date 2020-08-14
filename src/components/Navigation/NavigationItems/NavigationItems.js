import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let  navItems = (
        <ul className="NavigationItems">
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/login">Login/Signup</NavigationItem>
        </ul>
    );
    if (props.isAuthenticated) {
        navItems = (
            <ul className="NavigationItems">
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </ul>
        );
    }
    return navItems;
}

export default navigationItems;
