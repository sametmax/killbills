
import { Component, Children } from 'react'

import eventBus from '../base/base.jsx';

import axios from 'axios';

class Api {

  constructor({baseUrl='/api/', resourcePath=''}) {
    this.baseUrl = '/api/';
    this.resourcePath = resourcePath;
  }

  buildUrl(url=""){
    return (this.baseUrl + this.resourcePath + url).replace('//', '/');
  };

  post(data){
    return axios.post(this.buildUrl(), data).then((response) => {
      return response.data;
    })
  };

  get(){
    return axios.get(this.buildUrl()).then((response) => {
      return response.data;
    })
  };

  delete(url=""){
    return axios.delete(this.buildUrl(url));
  }

}




class MutableStore {
  constructor() {
    this.data = {
      moneyBooks: {}
    };
  }

  change(callback, event){
    return eventBus.trigger(event, callback());
  }
}

var store = new MutableStore();



class MoneyBooks {

  constructor() {

    this.books = store.data.moneyBooks;

    this.api = new Api({resourcePath: '/moneybooks/'});

    this.on = {
      change: (callback) => {
        eventBus.on('MONEYBOOKS CHANGED', callback);
      }
    };

    this.off = {
      change: (callback) => {
        eventBus.off('MONEYBOOKS CHANGED', callback);
      }
    };
  }

  loadMoneyBooks(){
    this.api.get().then((moneyBooks) => {
        store.change(() => {
          moneyBooks.forEach((moneyBook) => {
              store.data.moneyBooks[moneyBook.id] = moneyBook;
          });
        }, 'MONEYBOOKS CHANGED');
    });
  }

  createBook(book){
    return this.api.post(book).then((book) => {
      store.change(() => {
        store.data.moneyBooks[book.id] = book;
      }, 'MONEYBOOKS CHANGED')
    });
  }

  deleteBook(book){
    return this.api.delete("/" + book.id + "/").then(() => {
      store.change(() => {
        delete store.data.moneyBooks[book.id];
      }, 'MONEYBOOKS CHANGED')
    });
  }
}

var moneyBooks = new MoneyBooks();


export {store, moneyBooks};
