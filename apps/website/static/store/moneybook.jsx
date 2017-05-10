
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { List, Map } from 'immutable';
import axios from 'axios';

const initialState = Map({'moneyBooks': List()});

function reducer(state=initialState, action){
  switch (action.type) {
    case 'ADD_MONEYBOOK':
      return state.updateIn(
          ['moneyBooks'],
          function(moneyBooks){
              return moneyBooks.push(action.object);
          }
      );
    default:
      return state
  }
}

const store = createStore(reducer);


//actions

function addMoneyBookAction(moneybook){

    return {
        'type': 'ADD_MONEYBOOK',
        'object': moneybook
    };

}

export function addMoneyBook(moneybook){

    store.dispatch(addMoneyBookAction(moneybook));
}


axios.get('/api/moneybooks/').then((response) => {
    response.data.forEach((moneybook) => {
        addMoneyBook(moneybook)
    })
});

export default store;


