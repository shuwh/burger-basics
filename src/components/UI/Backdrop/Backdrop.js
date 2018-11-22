import React from 'react';
import { CSSTransition } from 'react-transition-group';

import classes from './Backdrop.css'

const backdrop = (props) => {
    // return props.show ? ( <div className={classes.Backdrop} onClick={props.clicked}></div> ) : null;
    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={100}
            classNames={{
                enter: classes.BackdropEnter,
                enterActive: classes.BackdropEnterActive,
            }}
        >
            <div className={classes.Backdrop} onClick={props.clicked}></div>
        </CSSTransition>
    );
}

export default backdrop;