import React from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Modal.css';

const modal = (props) => {
    const style = props.show ? [classes.Modal, classes.Show] : [classes.Modal];
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div
                className={style.join(' ')}>
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;