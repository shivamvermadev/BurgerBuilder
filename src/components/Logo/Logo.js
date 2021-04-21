import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../../src/assets/images/burger-logo.png';

const logo = (props) => {
    return (
        <div className = {classes.Logo}>
            <img src = {burgerLogo}  alt = "MyBurger" />
        </div>
    );
};

export default logo;