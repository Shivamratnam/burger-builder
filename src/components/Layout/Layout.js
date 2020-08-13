import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const layout = (props) => {
    return(
        <Aux>
            <Toolbar isAuthenticated={props.isAuthenticated}/>
            <SideDrawer />
            <main className="Content">
                {props.children}
            </main>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(layout);
