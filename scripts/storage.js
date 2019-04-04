'use strict';

const storage = (function() {
  const store = {
    items: [], 
    adding: false,
    sortFilter: null,
  };

  const addItem = function(item) {
    const obj = Object.assign(item, { expanded: false, editRating: false, editDescr: false});
    this.store.items.push(obj);
  };

  const findById= function(id) {
    return this.store.items.filter(item => item === item.id);
  };

  const findAndDelete = function(id) {
    this.store.items = this.store.items.filter(item => item.id !== id);
  };

  const sortFilter = function(num) {
    this.store.sortFilter = num;
  };

  const addingBookmark = function() {
    this.store.adding = true;
  };

  return {
    addItem,
    findById,
    store,
    findAndDelete,
    sortFilter,
    addingBookmark
  };
}());


