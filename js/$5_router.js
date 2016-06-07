(function routerEngine(w, d) {
  function showDelay(p, t) {
    setTimeout(function() {
      $(".post--list li")[p].classList.remove("displayNone");
    }, t);
  }

  var postList = $(".post--list")
  , postContainer = $("#post--list__container")
  , loadmoreButton = $("#loadmoreajax");

  var postDB
  , globalPostDB = []
  , numCat = 0
  , maxIndex = 15
  , maxReload = 5;

  var router = {
    routes: [],
    add: function(hash, fn) {
      this.routes.push({re: hash, fn: fn});
      return this;
    },
    checkRoute: function(hash) {
      for(var i in this.routes) {
        var match = hash.match(this.routes[i].re);
        if(match) {
          match.shift();
          this.routes[i].fn.apply({}, match);
          return this;
        }
      }
    },
    getPosts: function(data, hash, isIndex) {
      var showDelayTime = 0;
      numCat = 0;
      postDB = [];
      data.filter(function(post) {
        return (post.category.toLowerCase() === hash || hash === "alle");
      }).map(function(post) {
        if(numCat < maxIndex) {
          var cacheHTML = $(".post--list").html();
          $(".post--list").html(cacheHTML + post.card);
          showDelayTime += 100;
          showDelay(numCat, showDelayTime)
          numCat++;
        }
        postDB.push(post.card);
      });

      postContainer.removeClass("opacity-0");

      loader(0);
      var allowFetch = false;
      if ($(".post--list li").length < maxIndex || postDB.length <= maxIndex) {
        loadmoreButton.style("display", "none")
        allowFetch = false;
      } else {
        loadmoreButton.style("display", "block");
        allowFetch = true;
      }
      loadmoreButton[0].addEventListener('click', function() {
        if(allowFetch) loadMorePosts()
      })
      function loadMorePosts() {
        postListLI = $(".post--list li");
        if(isIndex && location.hash != "alle") {
          location.hash = "alle";
        }
        var showDelayTime = 0;
        for (var i = 0; i < maxReload; i++) {
          $(".post--list")[0].innerHTML += postDB[numCat];
          showDelayTime += 100;
          showDelay(numCat, showDelayTime);
          numCat++;
          var remainingPosts = postDB.length - $(".post--list li").length;
          $(".remaining-posts").text(remainingPosts)
          if(!postDB[numCat]) {
            loadmoreButton.style("display", "none");
            allowFetch = false;
            return;
          }
        }
        return;
      }
    },
    parser: function(hash, title, isIndex) {
      $("#toggleMenu")[0].checked = false;
      $("#searchWrapper").style("display", "none");
      // RESET
      loader(1);
      loadmoreButton.style("display", "none");
      postList.html(" ");
      postContainer.addClass("opacity-0");
      if(hash === "suche") {
        postContainer.removeClass("opacity-0");
        searchRender();
        loader(0);
        return;
      }

      if(globalPostDB.length <= 1) {
        ajax({
          method: "GET",
          useJSON: true,
          url: postJSONCache,
          success: function(data) {
            globalPostDB = data;
            this.getPosts(data, hash, isIndex);
          }.bind(this)
        });
      } else {
        this.getPosts(globalPostDB, hash, isIndex)
      }

    }
  };

  try {
    var kategorieSeite = document.getElementById("kategorieSeite").getAttribute("data-cat");
    switch (kategorieSeite) {
      case 'alle':
        router.parser('alle', 'Alle Beuträge');
        break;
      case 'allgemein':
        router.parser("allgemein", 'Allgemein');
        break;
      case 'pflegeberichte':
        router.parser("pflegeberichte", 'Pflegeberichte');
        break;
      case 'anleitungen':
        router.parser("anleitungen", 'Anleitungen');
        break;
      case 'produkttests':
        router.parser("produkttest", 'Produkttests');
        break;
      default:
        break;
    }
  } catch (e) {

  }
  try {
    var searchWrapper = document.getElementById('searchWrapper')
    if(searchWrapper) {
      return router.parser('suche')
    }
  } catch(e) {
    return
  }


  w.router = router;

  window.addEventListener("hashchange", function() {
    router.checkRoute(location.hash);
  });

  window.addEventListener("load", function() {
    router.checkRoute(location.hash);
  });


})(window, document);
