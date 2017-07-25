
import { Component, Children } from 'react'

import {eventBus, router} from '../base/base.jsx';

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

  put(data){
    return axios.put(this.buildUrl(), data);
  };

  patch(url, data){
    return axios.patch(this.buildUrl(url), data);
  };

}




class MutableStore {
  constructor() {
    var books = {};
    MONEYBOOKS_PRELOAD.forEach(function(moneybook){
      books[moneybook.id] = moneybook;
    });

    this.data = {
      moneyBooks: books
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

    //TODO store lastUsedBook in a cookie too
    this.lastUsedBook = localStorage.getItem("lastUsedBook") || "";
    if (!this.lastUsedBook && this.hasBooks()) {
       this.lastUsedBook = Object.keys(this.books)[0];
       localStorage.getItem("lastUsedBook", this.lastUsedBook);
    }
  }

  switchBook(id){
    this.lastUsedBook = id;
    localStorage.getItem("lastUsedBook", id);
    router.props.history.push('/moneybooks/' + id );
  }

  hasBooks(){
    return Object.keys(this.books).length > 0;
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

  partialUpdateBook(book){
    return this.api.patch("/" + book.id + "/", book).then(() => {
      store.change(() => {
        var oldMoneyBook = store.data.moneyBooks[book.id];
        store.data.moneyBooks[book.id] = {...oldMoneyBook, ...book};
      }, 'MONEYBOOKS CHANGED')
    });
  }
}

var moneyBooks = new MoneyBooks();


export {store, moneyBooks};
