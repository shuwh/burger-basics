import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/DrawerToggle';

import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <SideDrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems 
                isAuthenticated={props.isAuth}
            />
        </nav>
    </header>
);
export default toolbar;