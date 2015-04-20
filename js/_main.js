var
	linklist              = _("#linklist"),
	linklistAnchor        = _("#linklist a"),
	toggleMenuBox         = _("#toggleMenu"),
	docHeight             = window.innerHeight,
	docWidth              = window.innerWidth,
	contOverlay           = _("#containeroverlay"),
	contOverlayInner      = _("#containeroverlay-inner"),
	contOverlayClose      = _('#closeOverlay'),
	contImage             = _(".post--content p img"),
	breadtop              = _(".hamburger li:nth-child(1)"),
	beef                  = _(".hamburger li:nth-child(2)"),
	breadbottom           = _(".hamburger li:nth-child(3)"),
	linklistMaxHeight     = '230px',
	postsToLoad           = _('.post--list li'),
	dellocalStorage       = _('.dellocalStorage'),
	localStorageContainer = _('.localStorageContainer'),
	searchModal           = _('.open_search');
	activeScrollResize    = false;

linklist.style.maxHeight = linklistMaxHeight;

if ( postsToLoad ) {

	postsToLoad.forEach(function(post) {

			checkRead(post.getAttribute("data-read"), post);

	});
}

function hamburgerToggle() {

	if( toggleMenuBox.checked ) {

		linklist.style.maxHeight = linklistMaxHeight;
		breadbottom.addClass("hidden");
		breadtop.addClass("rot45deg");
		beef.addClass("rot-45deg");

	} else {

		linklist.style.maxHeight = "0";
		breadbottom.removeClass("hidden");
		breadtop.removeClass("rot45deg");
		beef.removeClass("rot-45deg");

	}
}

function updateMenu() {

	docHeight = window.innerHeight;
	docWidth  = window.innerWidth;

	if( docWidth >= 750 ) {

		linklist.style.maxHeight = linklistMaxHeight;

	} else {

		hamburgerToggle();

	}
}

linklistAnchor.forEach(function(_self) {

	anchor = _self.getAttribute('href');
	_self.setAttribute('href', '/#' + anchor.slice( 1, anchor.length ));

	_self.addEventListener('click', function() {

		toggleMenuBox.click();

	});
});


updateMenu();


(function(ci) {
	if(ci) {

		contImage.forEach(function(_self) {

			_self.addEventListener('click', function() {

				imgsrc = this.getAttribute('src');
				contOverlayInner.innerHTML = '<img src="" id="parse"><div class="containeroverlay-alt"></div>';
				contOverlayInner.querySelector('#parse').setAttribute('src', imgsrc);

				if( this.getAttribute('alt').length !== 0 ) {

					_(".containeroverlay-alt").innerHTML = this.getAttribute('alt');

				}

				contOverlay.addClass("scaleIn");

			    contOverlay.addEventListener('click', function() {

			    	contOverlay.removeClass("scaleIn");

			    });
			});
		});
	}

})(contImage);


searchRender = function() {

		//_('#post--list__container').innerHTML = '<div class="sucheInput"><input type="text" id="search-input" placeholder="Suchbegriff..."></div><ul id="results-container"></ul>';
		_('#searchWrapper').style.display = 'block';
		SimpleJekyllSearch.init({
	        searchInput: document.getElementById('search-input'),
	        resultsContainer: document.getElementById('results-container'),
	        dataSource: '/search.json',
	        searchResultTemplate: '{card}',
	        noResultsText: '<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>',
	        limit: 25,
	        fuzzy: false,
      	});

      	loader(false);
}

toggleMenuBox.addEventListener('click', function(e) {

	updateMenu();

});

window.addEventListener('resize', function() {

	updateMenu();

});


(function(lsc) {
	if(lsc) {
		for ( var i = 0; i < localStorage.length; i++) {
		localStorageContainer.innerHTML += '<li>' + localStorage.key(i) + ' - ' + localStorage.getItem(localStorage.key(i)) + '</li>';
		}

		if(localStorage.length === 0) {
			localStorageContainer.innerHTML = 'Keine Daten vorhanden.';
			dellocalStorage.hide();
		}

		dellocalStorage.addEventListener('click', function(e) {
			e.preventDefault();
			localStorage.clear();
			localStorageContainer.innerHTML = 'Alle Daten erfolgreich gelöscht!';
		});
	}
})(localStorageContainer);

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
