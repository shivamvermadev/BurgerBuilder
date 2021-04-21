import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

class BurgerBuilder extends React.Component {
    
    state = {
        totalPrice: 10,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseState = (ingredients) => {
        // const ingredients = {...this.state.ingredients};
        const arrIngredients = Object.keys(ingredients);
        const newArray = arrIngredients.map((curElement) => {
            return ingredients[curElement];
        });
        const sum = newArray.reduce((sum, cur) => {
            return sum + cur;
        }, 0);
        return sum > 0;
    }


    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.history.push("/auth");
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinuedHandler = () => {
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinuedHandler={this.purchaseContinuedHandler}>
            </OrderSummary>

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Auxillary>

                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                <Burger ingredients={this.props.ings}></Burger>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    purchaseHandler={this.purchaseHandler}
                    isAuthenticated = {this.props.isAuthenticated}
                />
            </Auxillary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.red.ingredients,
        price: state.red.totalPrice,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredients(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);