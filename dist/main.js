"use strict";

!function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
}({ 1: [function (require, module) {
    module.exports = function () {
      function receivedResponse(xhr) {
        return 200 == xhr.status && 4 == xhr.readyState;
      }function handleResponse(xhr, callback) {
        xhr.onreadystatechange = function () {
          if (receivedResponse(xhr)) try {
            callback(null, JSON.parse(xhr.responseText));
          } catch (err) {
            callback(err, null);
          }
        };
      }var self = this;self.load = function (location, callback) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");xhr.open("GET", location, !0), handleResponse(xhr, callback), xhr.send();
      };
    };
  }, {}], 2: [function (require, module) {
    function FuzzySearchStrategy() {
      function createFuzzyRegExpFromString(string) {
        return new RegExp(string.split("").join(".*?"), "gi");
      }var self = this;self.matches = function (string, crit) {
        return "string" != typeof string ? !1 : (string = string.trim(), !!string.match(createFuzzyRegExpFromString(crit)));
      };
    }module.exports = new FuzzySearchStrategy();
  }, {}], 3: [function (require, module) {
    function LiteralSearchStrategy() {
      function doMatch(string, crit) {
        return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0;
      }var self = this;self.matches = function (string, crit) {
        return "string" != typeof string ? !1 : (string = string.trim(), doMatch(string, crit));
      };
    }module.exports = new LiteralSearchStrategy();
  }, {}], 4: [function (require, module) {
    module.exports = function () {
      function findMatches(store, crit, strategy) {
        for (var data = store.get(), i = 0; i < data.length && matches.length < limit; i++) {
          findMatchesInObject(data[i], crit, strategy);
        }return matches;
      }function findMatchesInObject(obj, crit, strategy) {
        for (var key in obj) {
          if (strategy.matches(obj[key], crit)) {
            matches.push(obj);break;
          }
        }
      }function getSearchStrategy() {
        return fuzzy ? fuzzySearchStrategy : literalSearchStrategy;
      }var self = this,
          matches = [],
          fuzzy = !1,
          limit = 10,
          fuzzySearchStrategy = require("./SearchStrategies/fuzzy"),
          literalSearchStrategy = require("./SearchStrategies/literal");self.setFuzzy = function (_fuzzy) {
        fuzzy = !!_fuzzy;
      }, self.setLimit = function (_limit) {
        limit = parseInt(_limit, 10) || limit;
      }, self.search = function (data, crit) {
        return crit ? (matches.length = 0, findMatches(data, crit, getSearchStrategy())) : [];
      };
    };
  }, { "./SearchStrategies/fuzzy": 2, "./SearchStrategies/literal": 3 }], 5: [function (require, module) {
    module.exports = function (_store) {
      function isObject(obj) {
        return !!obj && "[object Object]" == Object.prototype.toString.call(obj);
      }function isArray(obj) {
        return !!obj && "[object Array]" == Object.prototype.toString.call(obj);
      }function addObject(data) {
        return store.push(data), data;
      }function addArray(data) {
        for (var added = [], i = 0; i < data.length; i++) {
          isObject(data[i]) && added.push(addObject(data[i]));
        }return added;
      }var self = this,
          store = [];isArray(_store) && addArray(_store), self.clear = function () {
        return store.length = 0, store;
      }, self.get = function () {
        return store;
      }, self.put = function (data) {
        return isObject(data) ? addObject(data) : isArray(data) ? addArray(data) : void 0;
      };
    };
  }, {}], 6: [function (require, module) {
    module.exports = function () {
      var self = this,
          templatePattern = /\{(.*?)\}/g;self.setTemplatePattern = function (newTemplatePattern) {
        templatePattern = newTemplatePattern;
      }, self.render = function (t, data) {
        return t.replace(templatePattern, function (match, prop) {
          return data[prop] || match;
        });
      };
    };
  }, {}], 7: [function (require) {
    !function (window) {
      "use strict";
      function SimpleJekyllSearch() {
        function initWithJSON() {
          store.put(opt.dataSource), registerInput();
        }function initWithURL(url) {
          jsonLoader.load(url, function (err, json) {
            err ? throwError("failed to get JSON (" + url + ")") : (store.put(json), registerInput());
          });
        }function throwError(message) {
          throw new Error("SimpleJekyllSearch --- " + message);
        }function validateOptions(_opt) {
          for (var i = 0; i < requiredOptions.length; i++) {
            var req = requiredOptions[i];_opt[req] || throwError("You must specify a " + req);
          }
        }function assignOptions(_opt) {
          for (var option in opt) {
            opt[option] = _opt[option] || opt[option];
          }
        }function isJSON(json) {
          try {
            return json instanceof Object && JSON.parse(JSON.stringify(json));
          } catch (e) {
            return !1;
          }
        }function emptyResultsContainer() {
          opt.resultsContainer.innerHTML = "";
        }function appendToResultsContainer(text) {
          opt.resultsContainer.innerHTML += text;$('#results-container li').each(function (i, result) {
            result.classList.remove('displayNone');
          });
        }function registerInput() {
          opt.searchInput.addEventListener("keyup", function (e) {
            return 0 == e.target.value.length ? void emptyResultsContainer() : void render(searcher.search(store, e.target.value));
          });
        }function render(results) {
          if (emptyResultsContainer(), 0 == results.length) return appendToResultsContainer(opt.noResultsText);for (var i = 0; i < results.length; i++) {
            appendToResultsContainer(templater.render(opt.searchResultTemplate, results[i]));
          }
        }var self = this,
            requiredOptions = ["searchInput", "resultsContainer", "dataSource"],
            opt = { searchInput: null, resultsContainer: null, dataSource: [], searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>', noResultsText: "No results found", limit: 10, fuzzy: !1 };self.init = function (_opt) {
          validateOptions(_opt), assignOptions(_opt), isJSON(opt.dataSource) ? initWithJSON(opt.dataSource) : initWithURL(opt.dataSource);
        };
      }var Searcher = require("./Searcher"),
          Templater = require("./Templater"),
          Store = require("./Store"),
          JSONLoader = require("./JSONLoader"),
          searcher = new Searcher(),
          templater = new Templater(),
          store = new Store(),
          jsonLoader = new JSONLoader();window.SimpleJekyllSearch = new SimpleJekyllSearch();
    }(window, document);
  }, { "./JSONLoader": 1, "./Searcher": 4, "./Store": 5, "./Templater": 6 }] }, {}, [7]);

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

var $sideMenu = $('.slidemenu');
var $sideMenuToggle = $('#slidemenutoggle');
var $fullPage = $('#fullpage');
var $navigation = $('#mainnav');

var loadingScreen = function loadingScreen(toggle) {
  var loadingElement = $('#loading');
  if (toggle) {
    loadingElement.show();
  } else {
    loadingElement.hide();
  }
};

var SideMenu = {};
SideMenu.close = function () {
  $sideMenu.removeClass('menuOut');
  $fullPage.off('click', SideMenu.closeFullpage);
  $fullPage.removeClass('opacity03');
};
SideMenu.closeFullpage = function (event) {
  event.preventDefault();
  SideMenu.close();
};
SideMenu.initialize = function () {
  SideMenu.close();
  $navigation.on('click', function () {
    if (!$sideMenu.hasClass('menuOut')) {
      $fullPage.addClass('opacity03');
      $sideMenu.addClass('menuOut');
    }
    setTimeout(function () {
      $fullPage.on('click', SideMenu.closeFullpage);
    }, 100);
  });
};
SideMenu.initialize();

var prepareSearch = function () {
  var searchWrapper = $('#searchWrapper');
  try {
    if (searchWrapper.length > 0) {
      $('#search_reset').on('click', function () {
        $('#search-input').val('');
        $('#results-container').html('');
      });
      searchWrapper.show();
      SimpleJekyllSearch.init({
        templateMiddleware: function templateMiddleware(prop, value, template) {
          console.log(template);
          return template.classList.remove('displayNone');
        },
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
    console.log(e);
  }
}();

var postContentLinks = function () {
  $('.post--content a').each(function (i, item) {
    $(item).attr('target', '_blank');
  });
}();

var acceptCookies = function () {
  if (!localStorage.getItem('GLOSSBOSS_COOKIES_ACCEPTED')) {
    $cookieAlert.show();
    $cookieAccept.on('click', function () {
      $cookieAlert.hide();
      localStorage.setItem('GLOSSBOSS_COOKIES_ACCEPTED', '1');
    });
  }
}();

var randomHeader = function () {
  var headerImages = ['merc-8.jpg', '1mcoupe.jpg', '530dteamwork.jpg', 'DSC00627.jpg', 'DSC00624.jpg', '965turbo.jpg', '9914s1.jpg', '997cabrio.jpg', '991turbos.jpg', '997grau.jpg', '997rot.jpg', 'alfagtv.jpg', 'audir8.jpg', 'audis5.jpg', 'bmw2002.jpg', 'eosschwarz.jpg', 'golf7gtd.jpg', 'lotuselise.jpg', 'm3csl.jpg', 'shelby.jpg', 'mclaren.jpg'];
  if (randomHeader) {
    var $headerStyle = $('#header-style');
    var rnd = Math.floor(Math.random() * (headerImages.length - 1));
    var headerImagesUrl = 'https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/' + headerImages[rnd];
    $headerStyle.html('header {background: ' + headerGradient + ', url(' + headerImagesUrl + ') center 50%; background-size:cover}');
  }
}();

var loadFont = function () {
  window.WebFontConfig = { google: { families: ['Lato::latin'] } };
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
}();

var addWhatsAppShareButton = function () {
  if ($('.post--sharing') && navigator.userAgent.match(/(iPhone)/g)) {
    var whatsAppBtn = $('.share--whatsapp');
    whatsAppBtn.css('display', 'inline-block');
    whatsAppBtn.attr('href', "WhatsApp://send?text=" + document.title + ": " + location.href);
  }
}();

var addEvents = function () {
  //Scotty, beam me up
  $('.scroll-top').on('click', function () {
    $('body').animate({
      scrollTop: 0
    }, 500);
  });

  // Show Disqus Comments
  $('.showCommentsContainer').on("click", function () {
    var disqus_shortname = 'glossboss';
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    $('.showCommentsContainer').fadeOut('fast');
  });
}();

var Mischungsrechner = function () {
  var part1 = $("#mischungInput1"),
      part2 = $("#mischungInput2"),
      predefinedValues = {},
      result = $("#mischungResult"),
      resultMl = $("#mischung--highlight"),
      output = "",
      mischungInputs = $("#mischungsrechner input"),
      header = $("#mischung--heading"),
      predefinedDil = $(".mischungenpredefined");

  var calculateDil = function calculateDil() {
    var allParts,
        step,
        res1,
        res2,
        res1Finish,
        res2Finish,
        cResult,
        bottleValue,
        cPart1 = part1.val(),
        cPart2 = part2.val();
    bottleValue = getBottleValue();

    allParts = parseInt(cPart1) + parseInt(cPart2);
    step = parseInt(bottleValue) / allParts;

    res1 = Math.round(step * cPart1).toFixed(2);
    res2 = Math.round(step * cPart2).toFixed(2);

    res1Finish = res1.slice(0, res1.length - 3);
    res2Finish = res2.slice(0, res2.length - 3);
    output = "" + res1Finish + "ml:" + res2Finish + "ml";
    console.log(output);
    return output;
  };
  var updateOutput = function updateOutput(output) {
    result.show();
    console.log(output);
    resultMl.text(output);
  };
  var getBottleValue = function getBottleValue() {
    var bottleValue = $('input[type="radio"]:checked').val() || 0;
    if (bottleValue > 0) {
      return bottleValue;
    } else {
      return 0;
    }
  };
  var shouldOutput = function shouldOutput(force) {
    var bottleValue = getBottleValue();
    if (part1.val() > 0 && part2.val() > 0 && bottleValue > 0) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  };
  var updateEvent = function updateEvent() {
    var canIUpdateplz = shouldOutput();
    if (canIUpdateplz) {
      updateOutput(calculateDil());
    }
  };
  var addEvents = function () {
    predefinedDil.on("click", function () {
      var content = this.innerHTML.split(":");
      predefinedValues = {
        part1: content[0],
        part2: content[1]
      };

      // set the 2 input values to the predefined ones
      part1.val(predefinedValues.part1);
      part2.val(predefinedValues.part2);

      updateEvent();
    });
    mischungInputs.on("change", updateEvent);
    mischungInputs.on("paste", updateEvent);
  }();
}();