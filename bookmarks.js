
/**
 * This is a sample script to demonstrate the 'layering' of dynamic
 * functionality onto a static page. It will 'inject' a list of current
 * bookmarks onto a home page (assumed to be at /) and, on any other page, a
 * link to either add or remove that page from the bookmarks.
 */

var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
var path = window.location.pathname;

if (path == "/") {
    showBookmarks(bookmarks);
} else {
    var index = bookmarks.indexOf(window.location.pathname);

    if (index == -1) {
        insertAddLink();
    } else {
        insertRemoveLink();
    }
}

/**
 * Add a list of current bookmarks to the very beginning of the document
 */
function showBookmarks(bookmarks) {
    if (bookmarks.length == 0) {
        return;
    }

    var newNode = document.createElement("div");
    var h2 = document.createElement("h2");

    h2.appendChild(document.createTextNode("Bookmarks"));
    newNode.appendChild(h2);

    var ul = document.createElement("ul");

    for (var i = 0; i < bookmarks.length; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(bookmarks[i]));
        a.setAttribute("href", bookmarks[i]);
        li.appendChild(a);
        ul.appendChild(li);
        newNode.appendChild(ul);
    }

    document.body.insertBefore(newNode, document.body.firstChild);
}

/**
 * Insert a link to bookmark the current page.
 */
function insertAddLink() {
    insertLink("Add", "addLink", addBookmark);
}

/**
 * Insert a link to remove the current page from bookmarks.
 */
function insertRemoveLink() {
    insertLink("Remove", "removeLink", removeBookmark);
}

/**
 * Insert a generic link at the beginning of the document.
 */
function insertLink(text, id, callback) {
    var body = document.body;
    var newNode = document.createElement("a");
    newNode.appendChild(document.createTextNode(text));
    newNode.setAttribute("id", id);
    newNode.setAttribute("href", "#");
    newNode.addEventListener("click", callback);
    body.insertBefore(newNode, body.firstChild);
}

/**
 * Delete the 'add' link.
 */
function deleteAddLink() {
    var nodeToDelete = document.querySelector('#addLink');
    nodeToDelete.parentNode.removeChild(nodeToDelete);
}

/**
 * Delete the 'remove' link.
 */
function deleteRemoveLink() {
    var nodeToDelete = document.querySelector('#removeLink');
    nodeToDelete.parentNode.removeChild(nodeToDelete);
}

/**
 * Bookmark the current page location in localStorage.
 */
function addBookmark(ev) {
    ev.preventDefault();
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    bookmarks.push(window.location.pathname);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    deleteAddLink();
    insertRemoveLink();
}

/**
 * Remove the current page location from the bookmarks in localStorage.
 */
function removeBookmark(ev) {
    ev.preventDefault();
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    var index = bookmarks.indexOf(window.location.pathname);

    if (index > -1) {
        bookmarks.splice(index, 1);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    deleteRemoveLink();
    insertAddLink();
}
