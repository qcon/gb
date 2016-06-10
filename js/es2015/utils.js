const $sideMenu = $('.slidemenu')
const $sideMenuToggle = $('#slidemenutoggle')
const $fullPage = $('#fullpage')
const $navigation = $('#mainnav')

const loadingScreen = (toggle) => {
  const loadingElement = $('#loading')
  if(toggle) {
    loadingElement.show()
  } else {
    loadingElement.hide()
  }
}

const SideMenu = {}
SideMenu.close = () => {
  $sideMenu.removeClass('menuOut')
  $fullPage.off('click', SideMenu.closeFullpage)
  $fullPage.removeClass('opacity03')
}
SideMenu.closeFullpage = (event) => {
  event.preventDefault()
  SideMenu.close()
}
SideMenu.initialize = () => {
  SideMenu.close()
  $navigation.on('click', () => {
    if(!$sideMenu.hasClass('menuOut')) {
      $fullPage.addClass('opacity03')
      $sideMenu.addClass('menuOut')
    }
    setTimeout(() => {
      $fullPage.on('click', SideMenu.closeFullpage)
    }, 100)
  })
}
SideMenu.initialize()

const prepareSearch = (() => {
  const searchWrapper = $('#searchWrapper')
  try {
    if(searchWrapper.length > 0) {
      $('#search_reset').on('click', () => {
        $('#search-input').val('')
        $('#results-container').html('')
      })
      searchWrapper.show()
      SimpleJekyllSearch.init({
        templateMiddleware: function(prop, value, template) {
          console.log(template);
          return template.classList.remove('displayNone')
        },
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        dataSource: postJSONCache,
        searchResultTemplate: '{card}',
        noResultsText: '<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>',
        limit: 25,
        fuzzy: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
})()

const postContentLinks = (() => {
 $('.post--content a').each((i,item) => {
   $(item).attr('target', '_blank')
 })
})()

const acceptCookies = (() => {
  if(!localStorage.getItem('GLOSSBOSS_COOKIES_ACCEPTED')) {
    $cookieAlert.show()
    $cookieAccept.on('click', () => {
      $cookieAlert.hide()
      localStorage.setItem('GLOSSBOSS_COOKIES_ACCEPTED', '1')
    })
  }
})()

const randomHeader = (() => {
  const headerImages = ['merc-8.jpg', '1mcoupe.jpg', '530dteamwork.jpg', 'DSC00627.jpg', 'DSC00624.jpg', '965turbo.jpg', '9914s1.jpg', '997cabrio.jpg', '991turbos.jpg', '997grau.jpg', '997rot.jpg', 'alfagtv.jpg', 'audir8.jpg', 'audis5.jpg', 'bmw2002.jpg', 'eosschwarz.jpg', 'golf7gtd.jpg', 'lotuselise.jpg', 'm3csl.jpg', 'shelby.jpg', 'mclaren.jpg']
  if(randomHeader) {
    const $headerStyle = $('#header-style')
    let rnd = Math.floor(Math.random() * (headerImages.length - 1))
    const headerImagesUrl = 'https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/' + headerImages[rnd]
    $headerStyle.html('header {background: ' + headerGradient + ', url(' + headerImagesUrl + ') center 50%; background-size:cover}')
  }
})()

const loadFont = (() => {
  window.WebFontConfig = {google:{ families: ['Lato::latin']}}
  let wf = document.createElement('script')
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
  '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})()

const addWhatsAppShareButton = (() => {
  if($('.post--sharing') && navigator.userAgent.match(/(iPhone)/g)) {
    let whatsAppBtn = $('.share--whatsapp')
    whatsAppBtn.css('display', 'inline-block')
    whatsAppBtn.attr('href', `WhatsApp://send?text=${document.title}: ${location.href}`)
  }
})()

const addEvents = (() => {
  //Scotty, beam me up
  $('.scroll-top').on('click', () => {
    $('body').animate({
      scrollTop: 0
    }, 500)
  })

  // Show Disqus Comments
  $('.showCommentsContainer').on("click", function() {
    var disqus_shortname = 'glossboss'
    var dsq = document.createElement('script')
    dsq.type = 'text/javascript'
    dsq.async = true
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq)
    $('.showCommentsContainer').fadeOut('fast')
  })
})()
