/* global postJSONCache loadingScreen */
let category = null;
let postDB = [];
let postsLoaded = 0;
const MAXRELOAD = 5;
const MAXINDEX = 15;
const $POSTLIST = $('.post--list');
const $LOADMOREBTN = $('#loadmoreajax');

function getPosts(cat) {
  const getVersion = $.getJSON('/version.json', (data) => {
    return data;
  }).then((version) => {
    return $.getJSON(`/posts.json?v=${version.posts}`, (data) => {
      postDB = data.filter((item) => {
        if (cat === 'alle') {
          return item.category.toLowerCase() === item.category.toLowerCase();
        }
        return item.category.toLowerCase() === cat;
      });
    });
  });
  return getVersion;
}

function loadPosts() {
  let $currentPosts = 0;
  let index = 0;
  let showDelay = 100;
  postDB.map((post, i) => {
    $currentPosts = $('.post--list li').length;
    if (($currentPosts < MAXINDEX && index < MAXINDEX)
      || (i >= $currentPosts && index < MAXRELOAD)) {
      $(post.card).appendTo($POSTLIST);
      showDelay += 100;
      index++;
      setTimeout(() => {
        $('.post--list li').eq(postsLoaded).removeClass('displayNone');
        postsLoaded++;
      }, showDelay);
      if (i === postDB.length - 1) $LOADMOREBTN.slideUp('fast');
    }
    return 0;
  });
}

function initPostLoader() {
  const $categoryElement = $('#kategorieSeite');
  if ($categoryElement.length > 0) {
    loadingScreen(true);
    category = $categoryElement.attr('data-cat');
    getPosts(category).then(() => {
      $LOADMOREBTN.fadeIn('slow');
      $LOADMOREBTN.on('click', loadPosts);
      loadPosts();
      loadingScreen(false);
    });
  }
}
$(() => {
  initPostLoader();
});

