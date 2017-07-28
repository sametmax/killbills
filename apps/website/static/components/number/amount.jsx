
import React from 'react';

import "./amount.sass";


function Amount(props) {

    var classes = "amount";
    if (props.value > 0){
      classes += " positive";
    } else if (props.value < 0) {
      classes += " negative";
    } else {
      classes += " zero";
    }

    return (
      <span className={classes}>{ props.value } {props.currency}</span>
    )
}

export {Amount};
