import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];

const buildControls = (props) => {
    return (
        <div className = {classes.BuildControls}>
            <p>Current Price: ₹ {props.price.toFixed(2)}</p>
            {controls.map((curElement) => {
                return <BuildControl 
                    key = {curElement.label} 
                    label = {curElement.label} 
                    added = {() => props.ingredientAdded(curElement.type)}
                    removed = {() => props.ingredientRemoved(curElement.type)}
                    disabled = {props.disabled[curElement.type]}/>
                    
            })}
            <button
                onClick = {props.purchaseHandler} 
                className = {classes.OrderButton}
                disabled = {!props.purchasable}>
                {props.isAuthenticated ? 'ORDER NOW' : 'Sign In to Continue' }</button>
        </div>
    );
}

export default buildControls;