
import React from 'react';

import "./amount.sass";


function Amount(props) {

    var classes = "amount";
    var sign = '';

    if (props.value < 0 || props.forceSign === "-") {
      classes += " negative";
      sign = '-';
    } else if (props.value > 0 || props.forceSign === "+"){
      classes += " positive";
    }

    if (props.value === 0) {
      classes += " zero";
    }

    if (props.forceSign === "-"){
      sign = '-';
    }

    var value = Math.abs(Math.round(props.value * 100) / 100);
    return (
      <span className={classes}>
        { sign } { value } {props.currency}
      </span>
    )
}

export {Amount};
