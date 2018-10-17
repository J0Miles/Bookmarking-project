// Listen for form sumbit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {

  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a vailid URL");
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  /*
      // Local storage test
      localStorage.setItem('Test', 'Hello Wolrd');
      console.log(localStorage.getItem('Test'));
      localStorage.removeItem('Test');
    */

  // Checks if bookmarks are null
  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);

    // Add to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Fetch from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Reset bookmarks
  fetchBookmarks();

  // Prevents immediate form submit
  e.preventDefault();
}

// Delete bookmarkResults

function deleteBookmark(url) {
  // Get bookmark from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Reset bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Fetch from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output Id
  var bookmarkResults = document.getElementById('bookmarkResults');
  // Build output
  bookmarkResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class = "well">' +
      '<h3>' + name +
      '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
      '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
      '</h3>' +
      '</div>';
  }
}
