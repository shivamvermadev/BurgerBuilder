import React from 'react';
import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((curElement) => {
        return <li key = {curElement}> <span style = {{textTransform: 'capitalize'}}> {curElement} </span>: {props.ingredients[curElement]} </li>
    })
    return (
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType = "Danger" clicked = {props.purchaseCancelHandler}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.purchaseContinuedHandler}>CONTINUE</Button>
        </Auxillary>
    );
}

export default orderSummary;