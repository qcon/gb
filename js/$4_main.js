(function main(w, d) {
  var shareCounter = $("#sharecounter"),
    searchReset = $("#search_reset"),
    postSharing = $(".post--sharing"),
    scrollTop = $(".scroll-top"),
    showComments = $(".showCommentsContainer"),
    pageHeading = $(".page-heading"),
    headerStyle = $("#header-style"),
    cookiesAlert = $(".cookies-hinweis"),
    cookiesAcc = $("#cookies_acc"),
    slideMenuToggle = $("#slidemenutoggle"),
    fullPage = $("#fullpage"),
    hashHrefs = $(".menucontent a.closeSlideMenuOnClick"),
    slideMenu = $(".slidemenu"),
    slideMenuContent = $(".menucontent");

  function closeSlideMenu() {
    slideMenu.removeClass("menuOut");
    fullPage.off("click", closeSlideMenuFullPage);
    hashHrefs.off("click", closeSlideMenu);
    fullPage.removeClass("opacity03");
  }

  function closeSlideMenuFullPage(e) {
    e.preventDefault();
    closeSlideMenu();
  }

  closeSlideMenu();
  slideMenuToggle.on("click", function() {
    if (slideMenu[0].classList.contains("menuOut")) {
      fullPage.on("click", closeSlideMenuFullPage);
      hashHrefs.on("click", closeSlideMenu);
    } else {
      fullPage.addClass("opacity03");
      slideMenu.addClass("menuOut");
      setTimeout(function() {
        fullPage.on("click", closeSlideMenuFullPage);
        hashHrefs.on("click", closeSlideMenu);
      }, 50);
    }
  });


  var postContentLinksBlank = (function() {
    //open all links in article in a new window by default
    $('.post--content a')._forEach(function(link) {
      link.setAttribute('target', '_blank')
    });
    $('.autor-box a')._forEach(function(link) {
      link.setAttribute('target', '_blank')
    });
  })();
  var renderAuthoren = (function() {
    function resetAuthoren() {
      $("li[data-author]").style("display", "none");
    }
    resetAuthoren();

    $("span[data-authorToggle]").on("click", function() {
      console.log("clicked on an author :)");
      resetAuthoren();
      var tempAuthor = this.getAttribute("data-authorToggle");
      $("li[data-author=" + tempAuthor + "]").style("display", "block");
    });
  })();

  var accCookies = (function() {
    if (!localStorage.getItem("GLOSSBOSS_COOKIES_ACCEPTED")) {
      cookiesAlert.style("display", "block");
    }
    cookiesAcc.on("click", function() {
      cookiesAlert.style("display", "none");
      localStorage.setItem("GLOSSBOSS_COOKIES_ACCEPTED", "1");
    });
  })();
  // var accDonation = (function() {
  // 	if(!localStorage.getItem("GLOSSBOSS_DONATION_ACC")) {
  // 		donationAlert.style("display", "block");
  // 	}
  // 	donationAcc.on("click", function() {
  // 		donationAlert.style("display", "none");
  // 		localStorage.setItem("GLOSSBOSS_DONATION_ACC", "1");
  // 	});
  // })();
  var addWhatsAppShareButton = (function() {
    if (postSharing && navigator.userAgent.match(/(iPhone)/g)) {
      var whatsAppButton = $(".share--whatsapp");
      whatsAppButton.style("display", "inline-block");
      whatsAppButton[0].href = "WhatsApp://send?text=" + document.title + ": " + location.href;
    }
  })();

  var rndHeader = (function() {
    if (randomHeader) {
      var headerImages = ["merc-8.jpg", "1mcoupe.jpg", "530dteamwork.jpg", "DSC00627.jpg", "DSC00624.jpg", "965turbo.jpg", "9914s1.jpg", "997cabrio.jpg", "991turbos.jpg", "997grau.jpg", "997rot.jpg", "alfagtv.jpg", "audir8.jpg", "audis5.jpg", "bmw2002.jpg", "eosschwarz.jpg", "golf7gtd.jpg", "lotuselise.jpg", "m3csl.jpg", "shelby.jpg", "mclaren.jpg"];
      //headerGradient = "linear-gradient(HSLA(197, 100%, 49%,.6),HSLA(197, 100%, 49%,.9))";
      random = Math.floor(Math.random() * (headerImages.length - 1));
      var headerImagesUrl = "https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/" + headerImages[random];
      headerStyle.html('header {background: ' + headerGradient + ', url(' + headerImagesUrl + ') center 50%; background-size:cover}');
    }
  })();

  function getShareCounter() {
    console.log('Get Shares');
    var shareUrl = "https://graph.facebook.com/" + w.location.href; // URL with slash
    var shareUrlSliced = shareUrl.slice(0, shareUrl.length - 1); // URL without slash
    var counterWithSlash = 0,
      counterWithoutSlash = 0,
      checkForUpdates = setInterval(checkForUpdatesFN, 100),
      completeWithSlash = false,
      completeWithoutSlash = false;

    // call with slash
    ajax({
      method: "GET",
      url: shareUrl,
      useJSON: true,
      success: function(data) {
        counterWithSlash = data.shares;
        completeWithSlash = true;
      }
    });

    // call without slash
    ajax({
      method: "GET",
      url: shareUrlSliced,
      useJSON: true,
      success: function(data) {
        counterWithoutSlash = data.shares;
        completeWithoutSlash = true;
      }
    });

    function checkForUpdatesFN() {
      if (completeWithSlash && completeWithoutSlash) {
        var totalShares = counterWithSlash + counterWithoutSlash;
        var outputText = "Sei der erste Glossboss der diesen Beitrag teilt!";

        if (counterWithSlash === counterWithoutSlash) totalShares /= 2;

        if (totalShares > 1) {
          outputText = totalShares + " Glossbosse haben diesen Beitrag bereits geteilt!"
        }
        clearInterval(checkForUpdates);
        shareCounter.text(outputText);
      }
    }
  }
  var forbiddenShareCounterLocations = ["/spenden/", "/mischungsrechner/", "/impressum/", "/", "/blog-abonnieren/", "/kontakt/", "/preview/"];
  var allowShareCounter = true;
  forbiddenShareCounterLocations.map(function(badpath) {
    if (location.pathname === badpath) allowShareCounter = false;
  });
  if (allowShareCounter) getShareCounter();

  var addEvents = function() {
    // Scotty, beam me up
    scrollTop.on("click", function() {
      slideMenuToggle.scrollTo();
    });

    // just load Disqus Comments, when the user wants to
    // PEEERRRFFRFRF
    showComments.on("click", function() {
      var disqus_shortname = 'glossboss';
      (function() {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();
      showComments.style("display", "none");
    });
  };

  addEvents();
})(window, document);