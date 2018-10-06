import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SiderDrawer';

import classes from './Layout.css';

// const layout = (props) => (
//     <Aux>
//         <Toolbar />
//         <SideDrawer />
//         <main className={classes.Content}>
//             {props.children}
//         </main>
//     </Aux>
// );

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
                <Toolbar drawerToggleClicked={this.toggleSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
}

export default Layout;