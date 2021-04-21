import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../../store/actions';

class Logout extends React.Component {

    componentDidMount() {
        this.props.onLogout();
        this.props.clearReduxOnLogout();
    }
    render() {
        return (<Redirect to="/" ></Redirect>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logout()),
        clearReduxOnLogout: () => dispatch(actionCreators.clearReduxOnLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);