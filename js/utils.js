/* global headerGradient, $, localStorage, location, headerImages, postsVersion */
const $cookieAlert = $('.cookies-hinweis')
const $cookieAccept = $('#cookies_acc')
const $autorBox = $('.autor-box-moreposts')
const $headerMenu = $('.header-menu')
const $headerMenuPlaceholder = $('.header-menu-placeholder')
const shouldStickPos = $headerMenu.offset().top
const $searchForm = $('#search_form')
const $showPhonenumber = $('#showPhonenumber')

let isScrolling = false
let clicked = 1

function scrollDelay (time, fn) {
  if (isScrolling) return
  isScrolling = true
  setTimeout(() => {
    fn()
    isScrolling = false
  }, time)
}
const totalHeight = parseInt(100 + $headerMenu.outerHeight())
$headerMenuPlaceholder.css({
  height: totalHeight
})
const stickyNav = () => {
  if ($(window).scrollTop() >= shouldStickPos) {
    $headerMenu.addClass('sticky')
    $headerMenuPlaceholder.addClass('sticky-placeholder')
  } else {
    $headerMenu.removeClass('sticky')
    $headerMenuPlaceholder.removeClass('sticky-placeholder')
  }
}

$(window).on('scroll', () => {
  scrollDelay(100, stickyNav)
})

function getPostDB () {
  return $.getJSON(postsVersion)
}


function appendLatestPosts (author) {
  const loadedPosts = getPostDB()
  loadedPosts.then((data) => {
    data.filter((a) => {
      return a.author === author
    }).map((posts, i) => { // eslint-disable-line
      if (i >= 5) return; // eslint-disable-line
      $autorBox.append($(`<li><a href="${posts.url}">${posts.title}</a></li>`))
    })
  })
}
if ($autorBox.length > 0) {
  appendLatestPosts($autorBox.attr('data-author'))
}

function loadingScreen (toggle) { // eslint-disable-line
  const loadingElement = $('#loading')
  if (toggle) {
    loadingElement.show()
  } else {
    loadingElement.hide()
  }
}

const acceptCookies = () => {
  if (!localStorage.getItem('GLOSSBOSS_COOKIES_ACCEPTED')) {
    $cookieAlert.show()
    $cookieAccept.on('click', () => {
      $cookieAlert.hide()
      localStorage.setItem('GLOSSBOSS_COOKIES_ACCEPTED', '1')
    })
  }
}
acceptCookies()

const randomHeader = (() => {
  if (randomHeader) {
    const $headerStyle = $('#header-style')
    const rnd = Math.floor(Math.random() * (headerImages.length - 1))
    const headerImagesUrl = headerImages[rnd]
    $headerStyle.html(`
      header {background: ${headerGradient},
      url(${headerImagesUrl}) center 50% no-repeat; background-size:cover;}
    `)
  }
})()

// const loadFont = (() => {
//   window.WebFontConfig = {google:{ families: ['Lato::latin']}}
//   let wf = document.createElement('script')
//   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//   '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
//   wf.type = 'text/javascript'
//   wf.async = 'true'
//   var s = document.getElementsByTagName('script')[0]
//   s.parentNode.insertBefore(wf, s)
// })()

const addWhatsAppShareButton = () => {
  if ($('.post--sharing') && navigator.userAgent.match(/(iPhone)/g)) {
    const whatsAppBtn = $('.share--whatsapp')
    whatsAppBtn.css('display', 'inline-block')
    whatsAppBtn.attr('href', `WhatsApp://send?text=${document.title}: ${location.href}`)
  }
}
addWhatsAppShareButton()

const addEvents = () => {
  // Scotty, beam me up
  $('.scroll-top').on('click', () => {
    $('body,html').animate({
      scrollTop: 0
    }, 500)
  })

  $searchForm.on('submit', (evt) => {
    evt.preventDefault()
    $searchForm.serialize()
    const searchIn = $('#search_input_nav').val()
    location.href = `/suche/?q=${searchIn}`
  })
  
  $showPhonenumber.on('click', () => {
    switch (clicked) {
      case 1:
        $showPhonenumber.text('Achtung! Kein Telefonsupport zum Thema Autopflege!')
        break
      case 2:
        $showPhonenumber.text('01703262412')
        $showPhonenumber.off('click')
        break
      default:
        return
        
    }
    clicked++;
  })

  // Show Disqus Comments
  $('.showCommentsContainer').on('click', () => {
    const disqusShortname = 'glossboss'
    const dsq = document.createElement('script')
    dsq.type = 'text/javascript'
    dsq.async = true
    dsq.src = `//${disqusShortname}.disqus.com/embed.js`;
    (document.getElementsByTagName('head')[0] ||
    document.getElementsByTagName('body')[0]).appendChild(dsq)
    $('.showCommentsContainer').fadeOut('fast')
  })
}
addEvents()
