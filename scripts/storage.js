'use strict';

const storage = (function() {
  const store = {
    items: [], 
    adding: false,
    sortNumber: null,
  };

  const addItem = function(item) {
    const obj = Object.assign(item, { expanded: false, editRating: false, editDescr: false});
    this.store.items.push(obj);
  };

  const findById = function(id) {
    return this.store.items.filter(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.store.items = this.store.items.filter(item => item.id !== id);
  };

  const sortFilter = function(num) {
    this.store.sortNumber = num;
    return this.store.items.filter(item => item.rating >= num);
  };

  const addingBookmark = function() {
    this.store.adding = true;
  };

  const expandBookmark = function(id) {
    return this.findById(id);
  };

  const setEditRating = function(id, editRating) {
    const item = this.findById(id);
    item.editRating = editRating;
  };

  const setEditDescr = function(id, editDescr) {
    const item = this.findById(id);
    item.editDescr = editDescr;
  };

  return {
    addItem,
    findById,
    store,
    findAndDelete,
    sortFilter,
    addingBookmark,
    expandBookmark,
    setEditRating,
    setEditDescr
  };
}());


