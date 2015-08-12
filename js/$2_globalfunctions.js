(function globalFunctions(w,d) {
	var markActiveLinkNavbar = function(hash) {
		// $(".linklistloop a").each(function(_self_) {
		// 	if(_self.getAttribute("data-kat") === hash ) {
		// 		_self.addClass("cat--active");
		// 		setTimeout(function() {
		// 			_self.scrollTo();
		// 		}, 50);
		// 	} else {
		// 		_self.removeClass("cat--active");
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
			cb: function() {
				return;
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
				x.setRequestHeader("Content-Type", "application/json:charset=UTF-8");
				x.send(JSON.stringify(opt.data));
			} else if(opt.method === "GET") {
				x.send();
			}
		} catch(err) {
			console.error("AJAX Error: " + err);
		}
	};
	WebFontConfig = {
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
})(window, document);