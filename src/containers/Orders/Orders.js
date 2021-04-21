import React from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';
import { connect } from 'react-redux';

class Orders extends React.Component {
    state = {
        loading: true,
        orders: []
    }

    componentDidMount() {
        axios.get('https://myburger-b6fec-default-rtdb.firebaseio.com/orders.json?auth=' + this.props.token)
        .then((res) => {
            // console.log(res.data);
            const fetchedOrders = [];

            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }

            this.setState({ loading: false, orders: fetchedOrders });
        })
        .catch((err) => {
            this.setState({ loading: false });

            alert("You are not authorized!")

        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    ></Order>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Orders);