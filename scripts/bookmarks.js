'use strict';
// store IIFE
/* global $ */
const bookmarks = (function(){
  
  function render() {
    let items = storage.store.items;
    console.log('ran');
    const bookmarkListString = generateBookmarkItemsString(items);
    $('.bookmark-list').html(bookmarkListString);
  }


  function handleAddBookmark() {
    $('.js-add-btn').on('click', function(event) {
      storage.addingBookmark();
      return $('.js-input').replaceWith(
        `
    <form class="js-add-bookmark">
      <label for="title">Title: </label>
      <input type="text" name="title" class="title" placeholder="Website Name">
      <label for="rating">Rating: </label>
      <input type="number" name="rating" class="rating" placeholder="Website Rating">
      <label for="url">URL: </label>
      <input type="text" name="url" class="url" placeholder="www.google.com">
      <label for="description">Description: </label>
      <textarea class = "description" name="description" cols="40" rows="5" placeholder="Enter a description for your bookmark"></textarea> 
      <section class="js-input">
        <button type = "submit" class = "button js-submit-btn">Submit Bookmark</button>
        <button type = "reset" class = "button js-reset-btn">Reset</button>
        <button type = "button" class = "button js-cancel-btn">Cancel</button>
      </section>
    </form>`
      );
    });
  }

  function generateBookmarkElement(item) {
    let itemTitle = `<h3 class = 'bookmark'>Title: ${item.title}</h3><h4 class = 'bookmark'>Rating: ${item.rating}</h4>`;
    if (item.expanded) {
      itemTitle = `${itemTitle}
      <span class = 'bookmark'>${item.rating}</span>
      <p class = 'bookmark'>${item.description}</p>
      <a href = ${item.url} class = 'visit-url-link'> Visit the site here!</a>
      `;
    }
    return `
    <li class="js-bookmark-element" id = ${item.id}>
    ${itemTitle}
    <div class="bookmark-inputs">
        <button class="button js-bookmark-edit">
          <span class="button-label">edit</span>
        </button>
        <button class=" button js-bookmark-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
  </li>
    `;
  }

  function generateBookmarkItemsString(bookmarks) {
    const items = bookmarks.map((item) => generateBookmarkElement(item));
    return items.join('');
  }


  function handleFormSubmit() {
    // event delegation because we are creating the form from scratch
    $('body').on('submit', '.js-add-bookmark', function(event) {
      event.preventDefault();
      const title = $('.title').val();
      const rating = $('.rating').val();
      const url = $('.url').val();
      const description = $('.description').val();

      api.createItem(title, url, description, rating)
        .then((newItem) => {
          storage.addItem(newItem);
          console.log(newItem);
          
          render();
        })
        .catch(err => console.log(err.message));
    });
  }

  function handleExpandBookmark() {
    $('body').on('click', '.js-bookmark-element', function(event) {
      
    });
  }

  function handleCancelButton() {
    $('body').on('click', '.js-cancel-btn', function(event) {
      storage.store.adding = false;
      render();
    });
  }

  function handleDeleteItem() {
    $('body').on('click', '.js-bookmark-delete', function(event) {
      const id = $(event.currentTarget).closest('.js-bookmark-element').attr('id');
      api.deleteItem(id)
        .then(() => {
          storage.findAndDelete(id);
          render();
        })
        .catch(err => {
          console.log(err);
        }
        );
    });
  }

  function bindEventListeners() {
    handleAddBookmark(),
    handleFormSubmit(),
    handleCancelButton(),
    handleDeleteItem();
  }

  // $.fn.extend({
  //   serializeJson: function() {
  //     const obj = {};
  //     const formData = new FormData(this[0]);
  //     formData.forEach((val, key) => obj[key] = val);
  //     return JSON.stringify(obj);
  //   }
  // });

  return {
    bindEventListeners,
    render
  };
}());