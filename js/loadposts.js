/* global loadingScreen getPostDB headerGradient headerImages $ */
let category = null
let postDB = []
let postsLoaded = 0
const MAXRELOAD = 5
const MAXINDEX = 15
const $POSTLIST = $('.post--list')
const $LOADMOREBTN = $('#loadmoreajax')

function generateAndAppendPost(post, container) {
  //const $post = 
//   `<li class="displayNone">
//     <div class="postsListItem">
//       <a tabindex="-1" class="post-link" href="${post.url}">
//         <div tabindex="-1" class="post--img" style="background:url(${post.header_image}) 50% 50% no-repeat;background-size:cover;">
//         </div>
//           <div tabindex="0" class="post--list__content">
//             <span class="post--category">${post.category}</span>
//             <span class="post--datum">${post.date}</span>
//             <span class="post--title__a">${post.title} <small class="post--subtitle">${post.subtitle}</small>
//           </span>
//         </div>
//       </a>
//   </div>
// </li>`
const $post = `
<li class="blogPostCard displayNone ${post.highlight && "blogPostCard--highlight"}">
  <a href="${post.url}"><div class="blogPostCard--image" style="background:url(${post.header_image}) 50% 50% no-repeat;background-size:cover;">${post.gesponsort && '<div class="blogPostCard--gesponsort">gesponsort</div>'}</div></a>
  <div class="blogPostCard--date">${post.date} | ${post.category}</div>
  <a class="blogPostCard--title" href="${post.url}">${post.title}</a>
  <div class="blogPostCard--titleSeperator"></div>

  <a class="blogPostCard--subTitle" href="${post.url}">${post.subtitle}</a>

  <div class="blogPostCard--readMore">
    <div class="buttonWrapper">
      <a href="${post.url}" class="button_readMore">Weiterlesen</a>
    </div>
</div>
</li>


`
  
  return post.title && $($post).appendTo(container)
}

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
  randomDiv.attr('style', `background: ${headerGradient}, url(${headerImagesUrl}) bottom left no-repeat`)
  return randomDiv
}

function loadPosts () {
  let $currentPosts = 0
  let index = 0
  let showDelay = 50
  postDB.map((post, i) => {
    $currentPosts = $('.post--list li').length
    if (($currentPosts < MAXINDEX && index < MAXINDEX) ||
      (i >= $currentPosts && index < MAXRELOAD)) {
      // $(post.card).appendTo($POSTLIST)
      generateAndAppendPost(post, $POSTLIST)
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
