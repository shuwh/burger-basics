import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Modal.css';

// const modal = (props) => {
//     const style = props.show ? [classes.Modal, classes.Show] : [classes.Modal];
//     return (
//         <Aux>
//             <Backdrop show={props.show} clicked={props.clicked}/>
//             <div
//                 className={style.join(' ')}>
//                 {props.children}
//             </div>
//         </Aux>
//     )
// }


class Modal extends Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
    };


    render() {
        const style = this.props.show ? [classes.Modal, classes.Show] : [classes.Modal];
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.clicked} />
                <div
                    className={style.join(' ')}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;