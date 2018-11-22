import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Modal.css';


class Modal extends Component {

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children;
    };

    // render() {
    //     const style = this.props.show ? [classes.Modal, classes.Show] : [classes.Modal];
    //     return (
    //         <Aux>
    //             <Backdrop show={this.props.show} clicked={this.props.clicked} />
    //             <div
    //                 className={style.join(' ')}>
    //                 {this.props.children}
    //             </div>
    //         </Aux>
    //     );
    // }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.clicked} />
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={this.props.show}
                    classNames={{
                        enter: classes.ModalEnter,
                        enterActive: classes.ModalEnterActive,
                        enterDone: classes.ModalEnterDone,
                        exit: classes.ModalExit,
                        exitActive: classes.ModalExitActive,
                        exitDone: classes.ModalExitDone,
                    }}
                    timeout={300}
                >
                    <div className={classes.Modal}>
                        {this.props.children}
                    </div>
                </CSSTransition>
            </Aux>
        );
    }
}

export default Modal;