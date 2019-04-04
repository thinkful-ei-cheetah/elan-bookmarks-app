'use strict';
// store IIFE
const bookmarks = (function(){
  const store = {
    items: [{
      expanded: false,
      editRating: false,
      editDescr: false
    }
    ], 
    adding: false
  };
}());