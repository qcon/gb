/* global headerGradient, $, localStorage, location */
const $cookieAlert = $('.cookies-hinweis');
const $cookieAccept = $('#cookies_acc');
const $autorBox = $('.autor-box-moreposts');
const $headerMenu = $('.header-menu');
const shouldStickPos = $headerMenu.offset().top;
const $searchForm = $('#search_form');

let isScrolling = false;

function scrollDelay (time, fn) {
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => {
    fn();
    isScrolling = false;
  }, time);
}
const stickyNav = () => {
  if ($(window).scrollTop() >= shouldStickPos) {
    $headerMenu.addClass('sticky');
  } else {
    $headerMenu.removeClass('sticky');
  }
};

$(window).on('scroll', () => {
  scrollDelay(100, stickyNav);
});

function getPostDB () {
  return $.getJSON('/posts.json');
}

function appendLatestPosts (author) {
  const loadedPosts = getPostDB();
  loadedPosts.then((data) => {
    data.filter((a) => {
      return a.author === author;
    }).map((posts, i) => { // eslint-disable-line
      if (i >= 5) return; // eslint-disable-line
      $autorBox.append($(`<li><a href="${posts.url}">${posts.title}</a></li>`));
    });
  });
}
if ($autorBox.length > 0) {
  appendLatestPosts($autorBox.attr('data-author'));
}

function loadingScreen (toggle) { // eslint-disable-line
  const loadingElement = $('#loading');
  if (toggle) {
    loadingElement.show();
  } else {
    loadingElement.hide();
  }
}

const acceptCookies = () => {
  if (!localStorage.getItem('GLOSSBOSS_COOKIES_ACCEPTED')) {
    $cookieAlert.show();
    $cookieAccept.on('click', () => {
      $cookieAlert.hide();
      localStorage.setItem('GLOSSBOSS_COOKIES_ACCEPTED', '1');
    });
  }
};
acceptCookies();

const randomHeader = (() => {
  const headerImages = ['merc-8.jpg', '1mcoupe.jpg', '530dteamwork.jpg', 'DSC00627.jpg',
    'DSC00624.jpg', '965turbo.jpg',
    '9914s1.jpg', '997cabrio.jpg', '991turbos.jpg', '997grau.jpg', '997rot.jpg', 'alfagtv.jpg',
    'audir8.jpg', 'audis5.jpg', 'bmw2002.jpg', 'eosschwarz.jpg', 'golf7gtd.jpg', 'lotuselise.jpg',
    'm3csl.jpg', 'shelby.jpg', 'mclaren.jpg'];
  if (randomHeader) {
    const $headerStyle = $('#header-style');
    const rnd = Math.floor(Math.random() * (headerImages.length - 1));
    const headerImagesUrl = `https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/${headerImages[rnd]}`;
    $headerStyle.html(`
      header {background: ${headerGradient},
      url(${headerImagesUrl}) center 50%; background-size:cover}
    `);
  }
})();

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
    const whatsAppBtn = $('.share--whatsapp');
    whatsAppBtn.css('display', 'inline-block');
    whatsAppBtn.attr('href', `WhatsApp://send?text=${document.title}: ${location.href}`);
  }
};
addWhatsAppShareButton();

const addEvents = () => {
  // Scotty, beam me up
  $('.scroll-top').on('click', () => {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
  });

  $searchForm.on('submit', (evt) => {
    evt.preventDefault();
    $searchForm.serialize();
    const searchIn = $('#search_input_nav').val();
    location.href = `/suche/?q=${searchIn}`;
  });

  // Show Disqus Comments
  $('.showCommentsContainer').on('click', () => {
    const disqusShortname = 'glossboss';
    const dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = `//${disqusShortname}.disqus.com/embed.js`;
    (document.getElementsByTagName('head')[0] ||
    document.getElementsByTagName('body')[0]).appendChild(dsq);
    $('.showCommentsContainer').fadeOut('fast');
  });
};
addEvents();
