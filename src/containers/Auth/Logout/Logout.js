import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {

    /**
     * React Lifecycle Hook, called when the component is initialized.
     */
    componentDidMount() {
        sessionStorage.clear();
        this.props.onLogout();
    }

    /**
     * Renders the UI to the DOM
     */
    render() {
        return (
            <Redirect to="/" />
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
