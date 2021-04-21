import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        }); 
    }

    render() {
        return (
            <Auxillary>
                <Toolbar isAuth = {this.props.isAuthenticated} drawerToggleClicked = {this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    open = {this.state.showSideDrawer}
                    closed = {this.sideDrawerClosedHandler}>
                </SideDrawer>

                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        );
    }
}

const mapStateToProps = (state) => {
    return  {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);