import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary';

const sideDrawer = (props) => {
    let attatchedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attatchedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxillary>
            <BackDrop show = {props.open} clicked = {props.closed}></BackDrop>
            <div className = {attatchedClasses.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth} />
                </nav>
            </div>
        </Auxillary>
    );

};

export default sideDrawer;