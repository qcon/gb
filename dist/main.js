'use strict';

var loadingScreen = function loadingScreen(toggle) {
  var loadingElement = $('#loading');
  if (toggle) {
    loadingElement.show();
  } else {
    loadingElement.hide();
  }
};

var prepareSearch = function prepareSearch() {
  var searchWrapper = $('#searchWrapper');
  try {
    if (searchWrapper.length > 0) {
      $('#search_reset').on('click', function () {
        $('#search-input').val('');
        $('#results-container').html('');
      });
      searchWrapper.show();
      SimpleJekyllSearch.init({
        // templateMiddleware: function(prop, value, template) {
        //   console.log(template);
        //   return template.classList.remove("displayNone")
        // },
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        dataSource: postJSONCache,
        searchResultTemplate: '{card}',
        noResultsText: '<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>',
        limit: 25,
        fuzzy: false
      });
    }
  } catch (e) {
    // NOOOOOOOOPE
  }
};
prepareSearch();
//=include mischungsrechner.js
var category = null;
var postDB = [];
var postsLoaded = 0;
var MAXRELOAD = 5;
var MAXINDEX = 15;
var POSTLIST = $('.post--list');
var LOADMOREBTN = $('#loadmoreajax');

function getPosts(cat) {
  return $.getJSON(postJSONCache, function (data) {
    postDB = data.filter(function (item) {
      if (cat === 'alle') {
        return item.category.toLowerCase() === item.category.toLowerCase();
      } else {
        return item.category.toLowerCase() === cat;
      }
    });
  });
}

function loadPosts() {
  var currentPosts = 0;
  var index = 0;
  var showDelay = 100;
  postDB.map(function (post, i) {
    currentPosts = $('.post--list li').length;
    if (currentPosts < MAXINDEX && index < MAXINDEX || i > currentPosts && index < MAXRELOAD) {
      $(post.card).appendTo(POSTLIST);
      showDelay += 100;
      index++;
      setTimeout(function () {
        console.log(index, i, currentPosts);
        $('.post--list li').eq(postsLoaded).removeClass('displayNone');
        postsLoaded++;
      }, showDelay);
      if (i === postDB.length - 1) LOADMOREBTN.slideUp('fast');
    }
  });
}

function initPostLoader() {
  var categoryElement = $('#kategorieSeite');
  if (categoryElement.length > 0) {
    loadingScreen(true);
    category = categoryElement.attr('data-cat');
    LOADMOREBTN.fadeIn('slow');
    LOADMOREBTN.on('click', loadPosts);
    getPosts(category).then(function () {
      loadPosts();
      loadingScreen(false);
    });
  }
}
$(function () {
  initPostLoader();
});