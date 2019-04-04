'use strict';
/* global $ */

$(document).ready(function() {
  bookmarks.bindEventListeners();
  api.getBookmarks()
    .then((items => {
      items.forEach((item) => storage.addItem(item));
      bookmarks.render();
    }))
    .catch(err => console.log(err.message));
});