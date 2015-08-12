document.addEventListener('DOMContentLoaded', function() {
(function(w, d) {
	"use strict";
	var $ = function(ele) {
		return new selectElement(ele);
	}

	var selectElement = function(selector) {
		var i = 0;
		var els = d.querySelectorAll(selector);
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

		// random Tasks
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
	, linklistMaxHeight = "230px";

	var addWhatsAppShareButton = (function() {
		if(postSharing && navigator.userAgent.match(/(iPhone)/g)) {
			var whatsAppButton = $(".share--whatsapp");
			whatsAppButton.style("display", "inline-block");
			whatsAppButton.href = "WhatsApp://send?text=" + document.title + ": " + location.href;
		}
	})();

	var addEvents = (function() {

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

		toggleMenu.on("click", updateMenu);
		window.addEventListener("resize", updateMenu);


	})();

	// Private Functions

	var updateMenu = (function() {
		var docHeight = w.innerHeight;
		var docWidth = w.innerWidth;

		(docWidth >= 750) ? linklist.style("maxHeight", linklistMaxHeight) : hamburgerToggle();
	})();
	function hamburgerToggle(tgl) {
		var expand = function() {
			linklist.style("maxHeight", linklistMaxHeight);
			breadBottom.addClass("hidden");
			breadTop.addClass("rot45deg");
			beef.addClass("rot-45deg");
		};
		var close = function() {
			linklist.style("maxHeight", "0");
			breadbottom.removeClass("hidden");
			breadtop.removeClass("rot45deg");
			beef.removeClass("rot-45deg");
		};
		(toggleMenu.checked) ? expand() : close();
	}
})(window, document);



// router.add('allgemein', function() {

// 	router.parser("allgemein");

// });

// router.add('anleitung', function() {

// 	router.parser("anleitungen");

// });

// router.add('pflegeberichte', function() {

// 	router.parser("pflegeberichte");

// });

// router.add('tipps-tricks', function() {

// 	router.parser("tipps-tricks", 'Tipps & Tricks');

// });

// router.add('produkttest', function() {

// 	router.parser("produkttest");

// });

// router.add('suche', function() {
// 	router.parser("suche");
// });

// router.add('test', function() {
// 	router.parser("test", "TESTSEITE!");
// });

// router.add('alle', function() {
// 	router.parser("alle", 'Alle Beiträge');
// 	setTimeout(function() {
// 		jumpTo($("#loadmoreajax"));
// 		$("#loadmoreajax").click();
// 	},50);
// });

// window.addEventListener("hashchange", function() {
// 	loader(true);
// 	router.checker(location.hash);
// });

// window.addEventListener("load", function() {
// 	loader(true);
// 	router.checker(location.hash);
// });

});
