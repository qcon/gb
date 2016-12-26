/* global loadingScreen getPostDB headerGradient headerImages $ */
let category = null
let postDB = []
let postsLoaded = 0
const MAXRELOAD = 5
const MAXINDEX = 15
const $POSTLIST = $('.post--list')
const $LOADMOREBTN = $('#loadmoreajax')

function getPosts (cat) {
  return getPostDB().then((data) => {
    postDB = data.filter((item) => {
      if (cat === 'alle') {
        return item.category.toLowerCase() === item.category.toLowerCase()
      }
      return item.category.toLowerCase() === cat
    })
  })
}
function appendRandomImage () {
  const randomDiv = $('<div class="randomHeroImg displayNone">GLOSSBOSS</div>')
  const rnd = Math.floor(Math.random() * (headerImages.length - 1))
  const headerImagesUrl = headerImages[rnd]
  randomDiv.prop('style', `background: ${headerGradient}, url(${headerImagesUrl}) bottom left no-repeat; background-size: cover; background-attachment: fixed;`)
  return $(randomDiv)
}

function loadPosts () {
  let $currentPosts = 0
  let index = 0
  let showDelay = 50
  postDB.map((post, i) => {
    $currentPosts = $('.post--list li').length
    if (($currentPosts < MAXINDEX && index < MAXINDEX) ||
      (i >= $currentPosts && index < MAXRELOAD)) {
      $(post.card).appendTo($POSTLIST)
      showDelay += 100
      index++
      if ($currentPosts >= 6 && $currentPosts % 6 === 0) {
        $(appendRandomImage()).appendTo($POSTLIST)
      }
      setTimeout(() => {
        $('.post--list li').eq(postsLoaded).removeClass('displayNone')
        $('.randomHeroImg').removeClass('displayNone')
        postsLoaded++
      }, showDelay)
      if (i === postDB.length - 1) $LOADMOREBTN.slideUp('fast')
    }
    return 0
  })
}

function initPostLoader () {
  const $categoryElement = $('#kategorieSeite')
  if ($categoryElement.length > 0) {
    loadingScreen(true)
    category = $categoryElement.attr('data-cat')
    getPosts(category).then(() => {
      $LOADMOREBTN.fadeIn('slow')
      $LOADMOREBTN.on('click', loadPosts)
      loadPosts()
      loadingScreen(false)
    })
  }
}
$(() => {
  initPostLoader()
})
