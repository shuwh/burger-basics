import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SiderDrawer';

import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    };

   toggleSideDrawerHandler = () => {
       this.setState((state, props) => { return { 
           showSideDrawer: !state.showSideDrawer
        }})
   };
    
    
    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.toggleSideDrawerHandler}
                />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.idToken !== null,
  }
}

export default connect(mapStateToProps)( Layout );