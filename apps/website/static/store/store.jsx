
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

  change(callback, event) {
    var value = callback();
    if (event) {
      eventBus.trigger(event, value);
    }
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
    this.lastUsedBook = localStorage.getItem("lastUsedBook");
    if (!this.lastUsedBook) {
      var book = this.getLastRelevantBook() || "";
      if (book) {
        this.lastUsedBook = book.id;
        localStorage.setItem("lastUsedBook", book);  
      } else { 
        this.lastUsedBook = "";
      }
    }
  }

  reachedBookLimit(){
    return Object.keys(this.books).length >= 7;
  }

  getLastRelevantBook(id){
    var book;
    if (id) {
      book = this.books[id];
      if (book) {
        return book;
      } 
    }
    if (this.lastUsedBook) {
      book = this.books[this.lastUsedBook];
      if (book) {
        return book;
      } 
      localStorage.removeItem("lastUsedBook");
    }
    if (this.hasBooks()) {
      book = this.books[Object.keys(this.books)[0]];
    }
    return book;
  }

  switchBook(id, noHistoryPush){
    store.change(() => {
      this.lastUsedBook = id;
      localStorage.setItem("lastUsedBook", id);
      if (noHistoryPush){
        return;
      }
      router.props.history.push('/moneybooks/' + id );
    }, 'MONEYBOOKS CHANGED');
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
      return book;
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
