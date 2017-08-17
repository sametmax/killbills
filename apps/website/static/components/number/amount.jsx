
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

    var value = Math.round(props.value * 100) / 100;

    return (
      <span className={classes}>{ value } {props.currency}</span>
    )
}

export {Amount};
