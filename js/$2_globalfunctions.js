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
		$(".linklistloop a")._forEach(function(_self) {
			if(_self.getAttribute("data-kat") === hash ) {
				_self.classList.add("cat--active");
				setTimeout(function() {
					$(".linklist").scrollTo();
				}, 50);
			} else {
				_self.classList.remove("cat--active");
			}
		});
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
			cb: function() {
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
					opt.cb(out);
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