'use strict';
// store IIFE
/* global $ */
const bookmarks = (function(){
  
  function render() {
    let items = storage.store.items;
    if(storage.store.adding === true) {
      $('.js-input').replaceWith(
        `
    <form class="js-add-bookmark js-input">
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
    } else {
      $('.js-input').replaceWith(`
      <section class="js-input">
        <button type = "button" class = "button js-add-btn">Add Bookmark</button>
        <label for="dropdown"></label>
        <select id="dropdown" name="ratings" class="button js-ratings-select">
          <option value="sort">Sort by Ratings</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </section>
        `
      );
    }
    console.log('ran');
    const bookmarkListString = generateBookmarkItemsString(items);
    $('.bookmark-list').html(bookmarkListString);
  }


  function handleAddBookmark() {
    $('body').on('click', '.js-add-btn', function(event) {
      storage.addingBookmark();
      render();
    });
  }

  function generateBookmarkElement(item) {
    let itemTitle = `<h3 class = 'bookmark'>Title: ${item.title}</h3><h4 class = 'bookmark'>Rating: ${item.rating}</h4>`;
    if (item.expanded) {
      itemTitle = `${itemTitle}
      <span class = 'bookmark'>${item.rating}</span>
      <p class = 'bookmark'>${item.desc}</p>
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
      const id = $(event.currentTarget).closest('.js-bookmark-element').attr('id');
      console.log(id);
      let item = storage.findById(id);
      console.log(item[0]);
      item[0].expanded = !item[0].expanded;
      generateBookmarkElement(item[0]);
      render();
    });
  }

  function handleCancelButton() {
    $('body').on('click', '.js-cancel-btn', function(event) {
      storage.store.adding = !storage.store.adding;
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

  function handleSort() {
    $('body').on('change', '.js-ratings-select', function(event) {
      const sortNumber = parseInt($('.js-ratings-select option:selected').text());
      storage.sortFilter(sortNumber);
    });
  }

  function bindEventListeners() {
    handleAddBookmark(),
    handleFormSubmit(),
    handleCancelButton(),
    handleDeleteItem(),
    handleExpandBookmark(),
    handleSort();
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