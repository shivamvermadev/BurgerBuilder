import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

class Checkout extends React.Component {



    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to="/" />;
        const purchasedRedirect = this.props.purchased ? <Redirect to = "/" /> : null;
        if (this.props.ings) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler} >
                    </CheckoutSummary>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} ></Route>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.red.ingredients,
        price: state.red.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);