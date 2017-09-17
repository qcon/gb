(function() {
function displaySearchResults(results, store) {
  var searchResults = document.getElementById('search-results');

  if (results.length) {
    var appendString = '';

    for (var i = 0; i < results.length; i++) { 
      var item = store[results[i].ref];
      appendString += "<li class=\"blogPostCard " + (item.highlight && "blogPostCard--highlight") + "\"><a href=\"" + item.url + "\"><div class=\"blogPostCard--image\" style=\"background:url(" + item.header_image + ") 50% 50% no-repeat;background-size:cover;\"></div></a><div class=\"blogPostCard--date\">" + item.date + " | " + item.category + "</div><a class=\"blogPostCard--title\" href=\"" + item.url + "\">" + item.title + "</a><div class=\"blogPostCard--titleSeperator\"></div><a class=\"blogPostCard--subTitle\" href=\"" + item.url + "\">" + item.subtitle + "</a><div class=\"blogPostCard--readMore\"><div class=\"buttonWrapper\"><a href=\"" + item.url + "\" class=\"button_readMore\">Weiterlesen</a></div></div></li>";
    }

    searchResults.innerHTML = appendString;
  } else {
    searchResults.innerHTML = '<li>Dazu konnten wir leider nichts finden.</li>';
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}

var searchTerm = getQueryVariable('q');
if (searchTerm) {
  document.getElementById('search-box').setAttribute("value", searchTerm);
  var idx = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('author', { boost: 10 });
  for (var key in window.store) {
    this.add({
      'id': key,
      'title': window.store[key].title,
      'author': window.store[key].author
    });

  }
  });
  var results = idx.search(searchTerm);
  displaySearchResults(results, window.store); 
}
})();