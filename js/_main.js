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
	shareCounter          = _('#sharecounter'),
	showComments          = _('.showCommentsContainer'),
	eastereggNavbar       = _('#eastereggNavbar'),
	searchReset           = _('#search_reset'),
	searchModal           = _('.open_search'),
	headerStyle           = _('#header-style'),
	activeScrollResize    = false;

(function(ee) {
	if(ee) {
		// eastereggNavbar.addEventListener('click', function() {
		// 	_('.post--list li').forEach(function(e) {
		// 		e.addClass('eastereggNavbar');
		// 	});
		// });
		augenkrebs = [
		'#ff00ff',
		'#00ffff',
		'#00ff00',
		'#ffff00',
		'#ff0000',
		'#0000ff',
		'#7920FF',
		'#FD0987',
		'#FF3300',
		'#FF6EC7',
		'#00FF66',
		'#4D4DFF',
		'#67C8FF',
		'#7BFB2D',
		'#AAFF00',
		'#FF00AA',
		'#AA00FF',
		'#FF7F00',
		'#228DFF',
		'#ff6d38',
		'#f90000',
		'#fd8b25',
		'#25d7fb',
		'#7920ff',
		'#fe51c3',
		'#ff9072',
		'#ff63a2',
		'#e3e641',
		];
		eastereggNavbar.addEventListener('click', function() {
			setInterval(function(){
				_("*").forEach(function(e) {
					e.style.backgroundColor = augenkrebs[Math.floor(Math.random()*(augenkrebs.length + 1))];
				});
			}, 150);
			
		});
	}
})(eastereggNavbar);

(function(rndhd) {
	if(rndhd) {
		var headerImages = ["merc-8.jpg", "1mcoupe.jpg", "530dteamwork.jpg", "965turbo.jpg", "9914s1.jpg", "997cabrio.jpg", "991turbos.jpg", "997grau.jpg", "997rot.jpg", "alfagtv.jpg", "audir8.jpg", "audis5.jpg", "bmw2002.jpg", "eosschwarz.jpg", "golf7gtd.jpg", "lotuselise.jpg", "m3csl.jpg", "shelby.jpg", "mclaren.jpg"];
		//headerGradient = "linear-gradient(HSLA(197, 100%, 49%,.6),HSLA(197, 100%, 49%,.9))";
		random = Math.floor(Math.random()*(headerImages.length - 1));
		headerImagesUrl = "//glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/" + headerImages[random];
		headerStyle.innerHTML = 'header {background: '+ headerGradient +', url('+ headerImagesUrl +') center 50%; background-size:cover}';
	}
})(randomHeader);

(function() {
	if(location.href.indexOf("/preview/") !== -1) {
		postContent = _(".post--content");
		postContent.hide();
		pw = prompt("Passwortgeschützter Bereich");
		if(pw !== "marvin") {
			//location.href = "http://glossboss.de/"
			alert("Falsches Passwort.")
		} else {
			postContent.style.display = "block";
		}
	}
})();

(function(sc) {
	if(sc) {
		showComments.addEventListener('click', function() {
			var disqus_shortname = 'glossboss';
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
			showComments.style.display = "none";
		});
	}
})(showComments);

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
};
updateMenu();

// if JS is enable, switch from normal category links
// to the much nicer AJAX category links
linklistAnchor.forEach(function(_self) {

	anchor = _self.getAttribute('href');
	_self.setAttribute('href', '/#' + anchor.slice( 1, anchor.length ));

	_self.addEventListener('click', function() {

		toggleMenuBox.click();

	});
});

searchRender = function() {
	(function(sr) {
		if(sr) {
			searchReset.addEventListener('click', function() {
				_('#search-input').value = '';
				_('#results-container').innerHTML = '';
			})
		}
	})(searchReset);
	
	_('#searchWrapper').style.display = 'block';
	SimpleJekyllSearch.init({
		searchInput: document.getElementById('search-input'),
		resultsContainer: document.getElementById('results-container'),
		dataSource: postJSONCache,
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

(function(sc) {
	if(sc) {
		xhr = new XMLHttpRequest();
		xhrSliced = new XMLHttpRequest();
		getSharesUrl = "https://graph.facebook.com/" + window.location.href;
		getSharesUrlSliced = getSharesUrl.slice(0, getSharesUrl.length-1);
		sharesOutput = "";
		var getSharesCount = 0;
		// unfortunately i had to get 2 numbers from the API because some links
		// were shared with a forwardslash and some not
		// if they were both the same number, they share the same counter
		// and i half them
		xhr.onreadystatechange = function(e) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				getShares = JSON.parse(xhr.responseText);
			}
		}
		xhrSliced.onreadystatechange = function(e) {
			if(xhrSliced.readyState == 4 && xhrSliced.status == 200) {
				getSharesSliced = JSON.parse(xhrSliced.responseText);
			}
		}
		var ajaxCheckInterval = setInterval(checkIntShare, 100);
		function checkIntShare() {
			if((xhrSliced.readyState == 4 && xhrSliced.status == 200) && (xhr.readyState == 4 && xhr.status == 200)) {
				sharesOutput = "Sei der erste Glossboss der diesen Beitrag teilt!";
				getSharesCount = (getSharesSliced.shares || 0) + (getShares.shares || 0);
				if (getSharesSliced.shares === getShares.shares) getSharesCount /= 2;
				if (getSharesCount > 1) {
					sharesOutput = getSharesCount + " Glossbosse haben diesen Beitrag bereits geteilt";
				} 
				if (getSharesCount == 1) {
					sharesOutput = "Erst 1 Glossboss hat diesen Beitrag geteilt";
				}
			clearInterval(ajaxCheckInterval);
			shareCounter.innerText = sharesOutput;
			}
		}
		xhr.open("GET", getSharesUrl);
		xhr.send();
		xhrSliced.open("GET", getSharesUrlSliced);
		xhrSliced.send();
	}
})(shareCounter);

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
