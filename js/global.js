document.addEventListener('DOMContentLoaded', function() {
(function(w, d) {
	"use strict";
	var $ = function(ele) {
		return new selectElement(ele);
	}

	var selectElement = function(selector) {
		var i = 0;
		var els = d.querySelectorAll(selector);
		
		// return ghost Element if Node is not in the DOM
		// prevent parsing error, when a function is called on this[0]
		if(els.length === 0) {
			els = d.createElement("div");
			this[0] = els;
			return this;
		}

		
		this.length = els.length;
		for(i; i<this.length;i++) {
			this[i] = els[i];
		}
		return this;
	}

	$.fn = selectElement.prototype = {
		// Helper (from andrew8088 / dome)
		each: function(cb) {
			this.map(cb);
			return this;
		},
		map: function(cb) {
			var res = [];
			for(var i = 0; i < this.length; i++) {
				res.push(cb.call(this, this[i], i));
			}
			return res;
		},
		eachOnce: function(cb) {
			var once = this.map(cb);
			return once.length > 1 ? once : once[0];
		},
		_forEach: function(cb) {
			return this.each(function(el) {
				cb(el);
			});
		},

		// Text and HTML manipulation
		html: function(html) {
			if(!html) {
				return this.eachOnce(function(el) {
					return el.innerHTML;
				})
			}
			return this.each(function(el) {
				el.innerHTML = html;
			});
		},
		text: function(text) {
			if(!text) {
				return this.eachOnce(function(el) {
					return el.textContent;
				});
			}
			return this.each(function(el) {
				el.textContent = text;
			});
		},

		// Events
		on: function(event, cb) {
			if(document.addEventListener) {
				return this.each(function(el) {
					el.addEventListener(event, cb, false);
				});
			}
		},

		// CSS manipulation
		addClass: function(classes) {
			return this.each(function(el) {
				el.classList.add(classes)
			});
		},
		removeClass: function(classes) {
			return this.each(function(el) {
				el.classList.remove(classes)
			});
		},
		css: function(css) {
			return this.each(function(el) {
				var getStyle = el.getAttribute("style");
				var setStyle = css;
				el.setAttribute("style", getStyle + setStyle)
			});
		},
		style: function(target, value) {
			return this.each(function(el) {
				el.style[target] = value;
			});
		},

		// random Tasks + DOM Events
		value: function() {
			return this.eachOnce(function(el) {
				return el.value;
			});
		},
		disable: function() {
			return this.each(function(el) {
				return el.disabled = true;
			});
		},
		enable: function() {
			return this.each(function(el) {
				return el.disabled = false;
			});
		},
		scrollTo: function() {
			return this.eachOnce(function(el) {
				var getOffset = el.getBoundingClientRect();
				var scrolltopfix = (document.body.scrollTop || document.documentElement.scrollTop);
				window.scrollTo(0,getOffset.top + scrolltopfix - 10);
			});
		}
	} 
	if(!w.$) {
	w.$ = $;
	}
	
})(window, document);

(function globalFunctions(w,d) {
	"use strict";
	var DIV = d.createElement("div");
	var appendModal = function(text, time, type) {
		type = type || "success";
		var modalWrap = $('.wrap-modal')[0];
		var modal = document.createElement("div");

		modal.innerText = text;
		modal.classList.add("modal");
		modal.classList.add("modal-" + type);
		setTimeout(function() {
			modal.classList.add("modal-show");
		}, 20);

		modalWrap.appendChild(modal);

		setTimeout(function() {
			modal.classList.remove("modal-show");
			setTimeout(function() {
				modalWrap.removeChild(modal);
			}, 250);
		}, time);
	};
	var loader = function (toggle) {
		var me = $("#loading");
		(toggle) ? me.style("opacity", "1").style("display", "block") : me.style("opacity", "0").style("display", "none");
	};
	var markActiveLinkNavbar = function(hash) {
		// $(".linklistloop a")._forEach(function(_self) {
		// 	if(_self.getAttribute("data-kat") === hash ) {
		// 		_self.classList.add("cat--active");
		// 		setTimeout(function() {
		// 			$(".linklist").scrollTo();
		// 		}, 50);
		// 	} else {
		// 		_self.classList.remove("cat--active");
		// 	}
		// });
	};
	var searchRender = function() {
		$("#search_reset").on('click', function() {
			$('#search-input')[0].value = '';
			$('#results-container').html(" ");
		});
		
		$('#searchWrapper').style("display", "block");
		SimpleJekyllSearch.init({
			searchInput: document.getElementById('search-input'),
			resultsContainer: document.getElementById('results-container'),
			dataSource: postJSONCache,
			searchResultTemplate: '{card}',
			noResultsText: '<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>',
			limit: 25,
			fuzzy: false,
		});
	};

	var ajax = function(opt) {
		var defaultOptions = {
			url: "",
			method: "GET",
			data: "",
			success: function() {
				return;
			},
			error: function() {

			},
			useJSON: false
		};
		opt = opt || defaultOptions;
		var x = new XMLHttpRequest();
		try {
			x.onreadystatechange = function() {
				if(x.readyState == 4 && x.status == 200) {
					var out = (opt.useJSON) ? JSON.parse(x.responseText, "text/json") : x.responseText;
					opt.success(out);
				}
			}
			x.open(opt.method, opt.url);
			if(opt.method === "POST") {
				x.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				x.send(JSON.stringify(opt.data));
			} else if(opt.method === "GET") {
				x.send();
			}
		} catch(err) {
			console.error("AJAX Error: " + err);
		}
	};
	w.WebFontConfig = {
		google: { families: [ 'Roboto::latin' ] }
	};
	(function() {
	  var wf = document.createElement('script');
	  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	  wf.type = 'text/javascript';
	  wf.async = 'true';
	  var s = document.getElementsByTagName('script')[0];
	  s.parentNode.insertBefore(wf, s);

	})();

	// assign Functions to window
	w.ajax = ajax;
	w.searchRender = searchRender;
	w.markActiveLinkNavbar = markActiveLinkNavbar;
	w.loader = loader;
	w.appendModal = appendModal;
	w.DIV = DIV;
})(window, document);

(function mischungsrechner(w, d) {
	var part1 = $("#mischungInput1")[0]
	, part2 = $("#mischungInput2")[0]
	, predefinedValues = {}
	, result = $("#mischungResult")
	, resultMl = $("#mischung--highlight")
	, output = ""
	, mischungInputs = $("#mischungsrechner input")
	, header = $("#mischung--heading")
	, predefinedDil = $(".mischungenpredefined");

	var calculateDil = function() {
		var allParts, step, res1, res2, res1Finish, res2Finish, cResult, bottleValue;
		bottleValue = getBottleValue();
		cPart1 = part1.value;
		cPart2 = part2.value;

		allParts = parseInt(cPart1) + parseInt(cPart2);
		step = parseInt(bottleValue) / allParts;

		res1 = Math.round(step * cPart1).toFixed(2);
		res2 = Math.round(step * cPart2).toFixed(2);

		res1Finish = res1.slice(0, res1.length - 3);
		res2Finish = res2.slice(0, res2.length - 3);
		output = "" + res1Finish + "ml:" + res2Finish + "ml";
		return output;
	};
	var updateOutput = function(output) {
		result.style("display", "block");
		resultMl.text(output);
	};
	var getBottleValue = function() {
		var bottleValue = $('input[type="radio"]:checked')[0].value || 0;
		if(bottleValue > 0) {
			return bottleValue;
		} else {
			return 0;
		}
	};
	var shouldOutput = function(force) {
		var bottleValue = getBottleValue();
		if(part1.value > 0 && part2.value > 0 && bottleValue > 0) {
			return true;
		} else {
			return false;
		}
	};
	var updateEvent = function() {
		var canIUpdateplz = shouldOutput();
		if(canIUpdateplz) {
			updateOutput(calculateDil());
		}
	};
	var addEvents = (function() {
		predefinedDil.on("click", function() {
			var content = this.innerHTML.split(":");
			predefinedValues = {
				part1: content[0],
				part2: content[1]
			}

			// set the 2 input values to the predefined ones
			part1.value = predefinedValues.part1;
			part2.value = predefinedValues.part2;
			
			updateEvent();
		});
		mischungInputs.on("change", updateEvent);
		mischungInputs.on("paste", updateEvent);
	})();
})(window, document)

!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module){module.exports=function(){function receivedResponse(xhr){return 200==xhr.status&&4==xhr.readyState}function handleResponse(xhr,callback){xhr.onreadystatechange=function(){if(receivedResponse(xhr))try{callback(null,JSON.parse(xhr.responseText))}catch(err){callback(err,null)}}}var self=this;self.load=function(location,callback){var xhr=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");xhr.open("GET",location,!0),handleResponse(xhr,callback),xhr.send()}}},{}],2:[function(require,module){function FuzzySearchStrategy(){function createFuzzyRegExpFromString(string){return new RegExp(string.split("").join(".*?"),"gi")}var self=this;self.matches=function(string,crit){return"string"!=typeof string?!1:(string=string.trim(),!!string.match(createFuzzyRegExpFromString(crit)))}}module.exports=new FuzzySearchStrategy},{}],3:[function(require,module){function LiteralSearchStrategy(){function doMatch(string,crit){return string.toLowerCase().indexOf(crit.toLowerCase())>=0}var self=this;self.matches=function(string,crit){return"string"!=typeof string?!1:(string=string.trim(),doMatch(string,crit))}}module.exports=new LiteralSearchStrategy},{}],4:[function(require,module){module.exports=function(){function findMatches(store,crit,strategy){for(var data=store.get(),i=0;i<data.length&&matches.length<limit;i++)findMatchesInObject(data[i],crit,strategy);return matches}function findMatchesInObject(obj,crit,strategy){for(var key in obj)if(strategy.matches(obj[key],crit)){matches.push(obj);break}}function getSearchStrategy(){return fuzzy?fuzzySearchStrategy:literalSearchStrategy}var self=this,matches=[],fuzzy=!1,limit=10,fuzzySearchStrategy=require("./SearchStrategies/fuzzy"),literalSearchStrategy=require("./SearchStrategies/literal");self.setFuzzy=function(_fuzzy){fuzzy=!!_fuzzy},self.setLimit=function(_limit){limit=parseInt(_limit,10)||limit},self.search=function(data,crit){return crit?(matches.length=0,findMatches(data,crit,getSearchStrategy())):[]}}},{"./SearchStrategies/fuzzy":2,"./SearchStrategies/literal":3}],5:[function(require,module){module.exports=function(_store){function isObject(obj){return!!obj&&"[object Object]"==Object.prototype.toString.call(obj)}function isArray(obj){return!!obj&&"[object Array]"==Object.prototype.toString.call(obj)}function addObject(data){return store.push(data),data}function addArray(data){for(var added=[],i=0;i<data.length;i++)isObject(data[i])&&added.push(addObject(data[i]));return added}var self=this,store=[];isArray(_store)&&addArray(_store),self.clear=function(){return store.length=0,store},self.get=function(){return store},self.put=function(data){return isObject(data)?addObject(data):isArray(data)?addArray(data):void 0}}},{}],6:[function(require,module){module.exports=function(){var self=this,templatePattern=/\{(.*?)\}/g;self.setTemplatePattern=function(newTemplatePattern){templatePattern=newTemplatePattern},self.render=function(t,data){return t.replace(templatePattern,function(match,prop){return data[prop]||match})}}},{}],7:[function(require){!function(window){"use strict";function SimpleJekyllSearch(){function initWithJSON(){store.put(opt.dataSource),registerInput()}function initWithURL(url){jsonLoader.load(url,function(err,json){err?throwError("failed to get JSON ("+url+")"):(store.put(json),registerInput())})}function throwError(message){throw new Error("SimpleJekyllSearch --- "+message)}function validateOptions(_opt){for(var i=0;i<requiredOptions.length;i++){var req=requiredOptions[i];_opt[req]||throwError("You must specify a "+req)}}function assignOptions(_opt){for(var option in opt)opt[option]=_opt[option]||opt[option]}function isJSON(json){try{return json instanceof Object&&JSON.parse(JSON.stringify(json))}catch(e){return!1}}function emptyResultsContainer(){opt.resultsContainer.innerHTML=""}function appendToResultsContainer(text){opt.resultsContainer.innerHTML+=text}function registerInput(){opt.searchInput.addEventListener("keyup",function(e){return 0==e.target.value.length?void emptyResultsContainer():void render(searcher.search(store,e.target.value))})}function render(results){if(emptyResultsContainer(),0==results.length)return appendToResultsContainer(opt.noResultsText);for(var i=0;i<results.length;i++)appendToResultsContainer(templater.render(opt.searchResultTemplate,results[i]))}var self=this,requiredOptions=["searchInput","resultsContainer","dataSource"],opt={searchInput:null,resultsContainer:null,dataSource:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',noResultsText:"No results found",limit:10,fuzzy:!1};self.init=function(_opt){validateOptions(_opt),assignOptions(_opt),isJSON(opt.dataSource)?initWithJSON(opt.dataSource):initWithURL(opt.dataSource)}}var Searcher=require("./Searcher"),Templater=require("./Templater"),Store=require("./Store"),JSONLoader=require("./JSONLoader"),searcher=new Searcher,templater=new Templater,store=new Store,jsonLoader=new JSONLoader;window.SimpleJekyllSearch=new SimpleJekyllSearch}(window,document)},{"./JSONLoader":1,"./Searcher":4,"./Store":5,"./Templater":6}]},{},[7]);

(function main(w, d) {
	var linklist = $("#linklist")
	, toggleMenu = $("#toggleMenu")
	, breadTop = $(".hamburger li:nth-child(1)")
	, beef = $(".hamburger li:nth-child(2)")
	, breadBottom = $(".hamburger li:nth-child(3)")
	, shareCounter = $("#sharecounter")
	, easterEggNavbar = $("#eastereggNavbar")
	, searchReset = $("#search_reset")
	, postSharing = $(".post--sharing")
	, scrollTop = $(".scroll-top")
	, showComments = $(".showCommentsContainer")
	, pageHeading = $(".page-heading")
	, headerStyle = $("#header-style")
	, linklistMaxHeight = "230px";


	var addWhatsAppShareButton = (function() {
		if(postSharing && navigator.userAgent.match(/(iPhone)/g)) {
			var whatsAppButton = $(".share--whatsapp");
			whatsAppButton.style("display", "inline-block");
			whatsAppButton[0].href = "WhatsApp://send?text=" + document.title + ": " + location.href;
		}
	})();

	var rndHeader = (function() {
		if(randomHeader) {
			var headerImages = ["merc-8.jpg", "1mcoupe.jpg", "530dteamwork.jpg", "965turbo.jpg", "9914s1.jpg", "997cabrio.jpg", "991turbos.jpg", "997grau.jpg", "997rot.jpg", "alfagtv.jpg", "audir8.jpg", "audis5.jpg", "bmw2002.jpg", "eosschwarz.jpg", "golf7gtd.jpg", "lotuselise.jpg", "m3csl.jpg", "shelby.jpg", "mclaren.jpg"];
			//headerGradient = "linear-gradient(HSLA(197, 100%, 49%,.6),HSLA(197, 100%, 49%,.9))";
			random = Math.floor(Math.random()*(headerImages.length - 1));
			var headerImagesUrl = "https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/" + headerImages[random];
			headerStyle.html('header {background: '+ headerGradient +', url('+ headerImagesUrl +') center 50%; background-size:cover}');
		}
	})();

	var getShareCounter = (function() {
		var shareUrl = "https://graph.facebook.com/" + w.location.href; // URL with slash
		var shareUrlSliced = shareUrl.slice(0, shareUrl.length - 1); // URL without slash
		var counterWithSlash = 0, counterWithoutSlash = 0,
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
			if(completeWithSlash && completeWithoutSlash) {
				var totalShares = counterWithSlash + counterWithoutSlash;
				var outputText = "Sei der erste Glossboss der diesen Beitrag teilt!";

				if(counterWithSlash === counterWithoutSlash) totalShares /= 2;

				if(totalShares > 1) {
					outputText = totalShares + " Glossbosse haben diesen Beitrag bereits geteilt!" 
				}
				clearInterval(checkForUpdates);
				shareCounter.text(outputText);
			}
		}
	})();

	var addEvents = function() {
		// Scotty, beam me up
		scrollTop.on("click", function() {
			linklist.scrollTo();
		});

		// just load Disqus Comments, when the user wants to
		// PEEERRRFFRFRF
		showComments.on("click", function() {
			var disqus_shortname = 'glossboss';
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
			showComments.style("display", "none");
		});

		var selectCatChange = (function() {
			var select = $("select[name=kategorie]");
			var select0 = select[0];
			select.on("change", function() {
				location.href = "/" + select0.options[select0.selectedIndex].value;
			});
		})();

		// Events for the Navbar
		//toggleMenu.on("change", updateMenu);
		// linklist.on("click", function() {
		// 	$("#toggleMenu")[0].checked = false;
		// 	updateMenu();
		// });
		//w.addEventListener("resize", updateMenu);
	};

	// Private Functions

	function updateMenu() {
		var docHeight = w.innerHeight;
		var docWidth = w.innerWidth;

		(docWidth >= 750) ? linklist.style("maxHeight", linklistMaxHeight) : hamburgerToggle();
	};
	//updateMenu();
	function hamburgerToggle(tgl) {
		var expand = function() {
			linklist.style("maxHeight", linklistMaxHeight);
			breadBottom.addClass("hidden");
			breadTop.addClass("rot45deg");
			beef.addClass("rot-45deg");
		};
		var close = function() {
			linklist.style("maxHeight", "0");
			breadBottom.removeClass("hidden");
			breadTop.removeClass("rot45deg");
			beef.removeClass("rot-45deg");
		};
		(toggleMenu[0].checked) ? expand() : close();
	}
	addEvents();
})(window, document);

(function routerEngine(w, d) {
	var postList = $(".post--list")
	, postContainer = $("#post--list__container")
	, pageHeading = $("#page-heading")
	, loadmoreButton = $("#loadmoreajax");

	var postDB
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
			try {
				if($("#indexContainer") && !hash && ItseMeIndex) {
				this.parser("index", "Die neuesten Beiträge", true);
			}
			} catch(up) {
				console.log("i dont care: " + up);
			}
			
		},
		getPosts: function(data, hash, isIndex) {
			var post = data;
			postDB = [];
			numCat = 0;
			for(var i = 0; i<post.length; i++) {
				if(post[i].category === hash || isIndex || hash === "alle") {
					if(numCat < maxIndex) {
						var cacheHTML = $(".post--list").html();
						$(".post--list").html(cacheHTML + post[i].card);
						numCat++;
					}
					postDB.push(post[i].card);
				}
			}
			postContainer.removeClass("opacity-0");
			pageHeading.removeClass("opacity-0");
			loader(0);
			($(".post--list li").length < maxIndex)
				?
				loadmoreButton.style("display", "none")
				:
				loadmoreButton.style("display", "block");

			loadmoreButton[0].onclick = function(e) {
				postListLI = $(".post--list li");
				if(isIndex && location.hash != "alle") {
					location.hash = "alle";
				}
				var showDelayTime = 0;
				showDelay = function(p, t) {
					setTimeout(function() {
						$(".post--list li")[p].classList.remove("displayNone");
					}, t);

				};

				for (var i = 0; i < maxReload; i++) {
					$(".post--list")[0].innerHTML += postDB[numCat];
					$(".post--list li")[numCat].classList.add('displayNone');
					showDelayTime += 100;
					showDelay(numCat, showDelayTime);
					numCat++;

					if(!postDB[numCat]) {
						loadmoreButton.style("display", "none");
						return;
					}
				}
				return;
			}

		},
		parser: function(hash, title, isIndex) {
			$("#toggleMenu")[0].checked = false;
			$("#searchWrapper").style("display", "none");
			markActiveLinkNavbar(hash);
			var _hash = hash.charAt(0).toUpperCase() + hash.slice(1, hash.length);
			title = title || _hash;
			// RESET

			loader(1);

			loadmoreButton.style("display", "none");
			pageHeading.addClass("opacity-0");
			pageHeading.text(title);

			postList.html(" ");
			postContainer.addClass("opacity-0");
			if(hash === "suche") {
				postContainer.removeClass("opacity-0");
				searchRender();
				loader(0);
				return;
			}

			ajax({
				method: "GET",
				useJSON: true,
				url: postJSONCache,
				success: function(data) {
					this.getPosts(data, hash, isIndex);
				}.bind(this)
			});
		}
	};










	router.add('allgemein', function() {
		router.parser("allgemein");
	});

	router.add('anleitung', function() {
		router.parser("anleitungen");
	});

	router.add('pflegeberichte', function() {
		router.parser("pflegeberichte");
	});

	router.add('tipps-tricks', function() {
		router.parser("tipps-tricks", 'Tipps & Tricks');
	});

	router.add('produkttest', function() {
		router.parser("produkttest");
	});

	router.add('suche', function() {
		router.parser("suche");
	});

	router.add('test', function() {
		router.parser("test", "TESTSEITE!");
	});

	router.add('alle', function() {
		router.parser("alle", 'Alle Beiträge');
		setTimeout(function() {
			$("#loadmoreajax").scrollTo();
			$("#loadmoreajax")[0].click();
		},50);
	});

	window.addEventListener("hashchange", function() { 
		router.checkRoute(location.hash);
	});

	window.addEventListener("load", function() {
		router.checkRoute(location.hash);
	});


})(window, document);

(function kontaktForm(w, d) {
	var send = $("#SENDEN")
	, kontaktMessage = $("#form_msg")
	, kName = $("#name")
	, kMail = $("#xyz")
	, kMessage = $("#msg")
	, selectBoss = $(".selectGlossboss input[name=glossboss]")
	, selectedBoss = {}
	, kInputs = $("#kontakt_inputs")
	, api = "R61bXP70NEnJXC2c__cvgg";


	// Private Function
	function kValidate (el, mail) {
		if(el.value() === "") {
			send.style("visibility", "");
			el.addClass("form__error");
			loader(0);
			appendModal("Unvollständige Angabe: " + el[0].placeholder, 3000, "error");
			return false;
		} else {
			if(mail) {
				var mailtest = /\S+@\S+\.\S+/
				if(!mailtest.test(el.value())) {
					kMail.addClass("form__error");
					appendModal("eMail Adresse ungültig!", 2000, "error");
					send.style("visibility", "");
					loader(0);
					return false;
				}
			}
			return true;
		}
	}
	function kReset() {
		kName.removeClass("form__error");
		kMail.removeClass("form__error");
		kMessage.removeClass("form__error");
		send.style("visibility", "hidden");
		loader(1);
	}
	function kSelectBoss() {
		// allow input
		kInputs.style("opacity", "1");
		send.enable();
		send.removeClass("cursor-not-allowed");

		selectedBoss.Mail = $(".selectGlossboss input[name=glossboss]:checked").value();
		selectedBoss.Name = $(".selectGlossboss input[name=glossboss]:checked")[0].getAttribute("data-boss");
	}
	function kInit() {
		kInputs.style("opacity", ".3");
		send.disable();
		send.addClass("cursor-not-allowed");
		addEvents();
	}
	function kSubmit() {
		kReset();
		var valName = kValidate(kName)
		, valMail = kValidate(kMail, true)
		, valMessage = kValidate(kMessage);
		if(valName && valMail && valMessage) {
			var mailData = {
				"key": api,
				"message": {
					"text": kMessage.value(),
					"subject": "GLOSSBOSS Kontaktanfrage",
					"from_email": kMail.value(),
					"from_name": kName.value(),
					"to": [
					{
						//"email": "mail@glossboss.de",
						"email": selectedBoss.Mail,
						"name": selectedBoss.Name,
						"type": "to"
					}
					],
					"headers": {
						"Reply-To": kMail.value()
					}
				},
				"async": false,
				"ip_pool": "Main Pool"
			};
			ajax({
				method: "POST",
				url: "https://mandrillapp.com/api/1.0/messages/send.json",
				data: mailData,
				useJSON: true,
				success: function(d) {
					loader(1);
					if(d[0].status === "sent") {
						send.style("visibility", "hidden");
						loader(0);
						appendModal("Danke für deine eMail! Wir werden so schnell wie möglich darauf antworten.", 4500);
					}
				}
			});
		}
	}
	function addEvents() {
		send.on("click", function(e){
			e.preventDefault();
			kSubmit();
		}, false);
		selectBoss.on("change", kSelectBoss);
	}

	kInit();
})(window, document);

});
