document.addEventListener('DOMContentLoaded', function() {

//MM SELECTOR <3
(function() {
	var debug = true,
	ls        = localStorage,
	i, conf, postArr, hash, out;
	conf = {
		maxPostReload: 5,
		maxIndexPosts: 10
	},
	slice = Array.prototype.slice;
	$ = function(expr, con) {
		var el = typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
		return el || document.createElement("div");
	}

	$$ = function(expr, con) {
		return slice.call((con || document).querySelectorAll(expr));
	}

	appendModal = function(text, time, type) {
		type = type || "success";
		var modalWrap = $('.wrap-modal'),
		modal = document.createElement("div");

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
	}
	// _ = function( elem ) {
	// 		try {
	// 		elemSliced   = elem.slice(1, elem.length);
	// 		elemSelector = elem.charAt(0);
	// 		returnNode   = [];
	// 		if ( /[^\w#.-]/.test(elem) ) {
	// 			//do the querySelectorAll, if:
	// 			//* there is a whitespace
	// 			//* there is a special char except # . -
	// 			//example: "input[type="radio"]:checked" OR
	// 			//".post-content p img"
	// 			getElements = document.querySelectorAll(elem);
	// 			getLength = getElements.length;
	// 			for( i = 0; i < getElements.length; i++ ) {
	// 				returnNode.push(getElements[i]);
	// 			}
	// 		} else {
	// 			switch ( elemSelector ) {
	// 				//get the IDs
	// 				case '#':
	// 					returnNode.push(document.getElementById( elemSliced ));
	// 					break;
	// 				//get the classes
	// 				case '.':
	// 					getClassNames = document.getElementsByClassName( elemSliced );
	// 					for( i = 0; i < getClassNames.length; i++ ) {
	// 						returnNode.push( getClassNames[i] );
	// 					}
	// 					break;
	// 				//get the tag names
	// 				default:
	// 					getTagNames = document.getElementsByTagName(elem);
	// 					for( i = 0; i < getTagNames.length; i++ ) {
	// 						returnNode.push( getTagNames[i] );
	// 					}
	// 					break;
	// 			}
	// 		}
	// 		returnNodeFinal = ( returnNode.length > 1 ) ? returnNode : returnNode[0];
	// 		if( returnNodeFinal ) {
	// 			return returnNodeFinal;
	// 		} else {
	// 			return;
	// 		}
	// 	}
	// 	catch(e) {
	// 		console.log("_ FUNC Error: " + e);
	// 		return;
	// 	}
	// };

	Element.prototype.addClass = function( className ) {
		_addClass = function( elem ) {
			if( elem.classList ) {
				elem.classList.add(className);
			} else {
				elem.className += ' ' + className;
			}
		};
		return _addClass( this );
	};

	Element.prototype.removeClass = function( className ) {
		_removeClass = function( elem ) {
			if ( elem.classList ) {
				elem.classList.remove(className);
			} else {
				elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		};
		return _removeClass( this );
	};

	Element.prototype.hide = function () {
		_hide = function( elem ) {
			elem.style.display = 'none';
		};

		return _hide( this );
	};
	/**
	 * Hide/Show the Loader
	 * @param  {[BOOL]} show [1 = show, 0 = hide]
	 */
	loader = function ( show ) {
		_self = $("#loading");
		if ( show ) {
			_self.style.opacity = '1';
			_self.style.display = 'block';
		} else {
			_self.style.opacity = '0';
			_self.style.display = 'none';
		}
	};
	/**
	 * Jump to a DOM Element
	 * @param  {[type]} elem [use _('element')]
	 */
	jumpTo = function ( elem ) {
			theOffset = elem.getBoundingClientRect();
			scrolltopfix = (document.body.scrollTop || document.documentElement.scrollTop);
			window.scrollTo(0,theOffset.top + scrolltopfix - 10);
	};

	log = function ( arg ) {
		if ( debug ) {
			console.log(arg);
		}
	};

	/**
	 * add acive CSS Class to the linklist item
	 * @return null
	 */
	markActiveLinklist = function(hash) {
		$$(".linklistloop a").forEach(function(_self) {
			if(_self.getAttribute("data-kat") === hash ) {
				_self.addClass("cat--active");
				setTimeout(function() {
					jumpTo(_self);
				}, 50);
			} else {
				_self.removeClass("cat--active");
			}
		});
	};
	ajax = function(url, method, data, cb, useJSON) {
		xmlxhr = new XMLHttpRequest();
		try {
			xmlxhr.onreadystatechange = function() {
				if(xmlxhr.readyState == 4 && xmlxhr.status == 200) {
					out = (useJSON) ? JSON.parse(xmlxhr.responseText) : xmlxhr.responseText;
					cb(out);
				}
			};
			if(method === "POST") {
				xmlxhr.open(method, url);
				xmlxhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				xmlxhr.send(JSON.stringify(data));
			} else {
				xmlxhr.open(method, url);
				xmlxhr.send();
			}
		} catch(err) {
			console.log("AJAX ERROR:" + err);
		}
	};
	/**
	 * check if this article is already read
	 * @param  {[String]} post [the Post]
	 * @param  {[String]} li   [add read-mark to the Listitem]
	 */
	checkRead = function( post, li ) {
		if(ls.getItem(post)) {
			li.addClass("is-viewed");
			// parseDate = new Date(ls.getItem(post));
			// tag = parseDate.getDate();
			// monat = parseDate.getMonth()+1;
			// jahr = parseDate.getFullYear();
			//li.querySelectorAll(".post--read")[0].textContent = 'Gelesen am: ' + tag + '.' + monat + '.' + jahr + ' | ';
		}
	};
	router = {

		routes: [],
		add: function(hash, func) {
			this.routes.push({re: hash, func: func});
			return this;
		},
		checker: function(hash) {
			for(var i in this.routes) {
				var match = hash.match(this.routes[i].re);
				if( match ) {
					match.shift();
					this.routes[i].func.apply({}, match);
					return this;
				}
			}
			loader(false);

			if( $("#indexContainer") && !hash ) {
				this.parser('index', 'Die neuesten Beiträge', true);
			}
		},
		parser: function( hash, title, isIndex ) {
			$('#searchWrapper').style.display = 'none';

			markActiveLinklist(hash);
			hashNice = hash.charAt(0).toUpperCase() + hash.slice(1,hash.length);
			title = title || hashNice;

			loader(true);

			postList = $(".post--list");
			postContainer = $("#post--list__container");
			pageHeading = $("#page-heading");
			loadmoreButton = $("#loadmoreajax");

			loadmoreButton.style.display = 'none';

			pageHeading.addClass("opacity-0");
			pageHeading.textContent = title;

			
			postList.innerHTML = '';
			postContainer.addClass("opacity-0");

			if(hash === "suche") {
				postContainer.removeClass("opacity-0");
				searchRender();
				return;
			}

			xhr = new XMLHttpRequest();

			

			xhr.onreadystatechange = function(e) {

				if(xhr.readyState == 4 && xhr.status == 200) {

					post = JSON.parse(xhr.responseText,"text/json");
					numCat = 0;
					postArr = [];
					postLoopFinished = false;

					/**
					 * loop through all posts and put them in an array
					 * if the category is identical with the hash, then
					 * append it to the postlist
					 */
					for( var i = 0; i < post.length; i++ ) {

						if(post[i].category === hash || (isIndex) || hash === 'alle') {


							if(numCat < conf.maxIndexPosts) {
								$(".post--list").innerHTML += post[i].card;
								numCat++;
							}
							postArr.push(post[i].card);
						}
					}
					$$(".post--list li").forEach(function(post, i) {

						checkRead(post.getAttribute("data-read"), post);

					});
					loader(false);
					pageHeading.removeClass("opacity-0");
					postContainer.removeClass("opacity-0");

					
					if($$(".post--list li").length < conf.maxIndexPosts) {

						loadmoreButton.style.display = 'none';

					} else {
						
						loadmoreButton.style.display = 'block';
					}	
				}
			};

			loadmoreButton.onclick = function(e) {
				e.preventDefault();
				e.stopPropagation();
				postListLI = $$(".post--list li");
				if( isIndex && location.hash != 'alle' ) {
					location.hash = 'alle';
				}
				var showDelayTime = 0;
				showDelay = function(p, t) {
					setTimeout(function() {
						$$(".post--list li")[p].removeClass("displayNone");
					}, t);

				};

				for (var i = 0; i < conf.maxPostReload; i++) {
					$(".post--list").innerHTML += postArr[numCat];
					$$(".post--list li")[numCat].addClass('displayNone');
					showDelayTime += 100;
					showDelay(numCat, showDelayTime);
					numCat++;

					if(!postArr[numCat]) {
						loadmoreButton.style.display = 'none';
						return;
					}
				}

				// $$(".post--list li").forEach(function(post, i) {

				// 		checkRead(post.getAttribute("data-read"), post);

				// });

				return;
			};

			progressBar.style.display = 'block';
			progressBar.style.width = '5%';
			xhr.addEventListener('progress', function(_self) {

				var progressBar = $('#progressBar');

				if( _self.lengthComputable ) {

					var percentComplete = Math.floor((_self.loaded / _self.total) * 100);

					progressBar.style.width = percentComplete + '%';

					if( percentComplete === 100 ) {

						setTimeout(function() {

							progressBar.style.display = 'none';

						}, 350);

					}

				}
			});
			xhr.open("GET", postJSONCache, true);
			xhr.send();
		}

	};
})();

var kontaktSenden    = $("#SENDEN"),
kontaktMessage       = $("#form_msg"),
kontaktForm          = $(".kontakt__form"),
kontaktLoading       = $("#loading"),
kontaktName          = $("#name"),
kontaktMail          = $("#xyz"),
kontaktNachricht     = $("#msg"),
selectGlossboss      = $$(".selectGlossboss input[name=glossboss]"),
selectedGlossboss    = {},
kontaktInputs        = $("#kontakt_inputs"),
api                  = "R61bXP70NEnJXC2c__cvgg";

kontaktSubmit = function() {
	//RESET
	kontaktName.removeClass("form__error");
	kontaktMail.removeClass("form__error");
	kontaktNachricht.removeClass("form__error");
	kontaktSenden.style.visibility = 'hidden';
	kontaktMessage.innerHTML = '';
	loader(1);

	//VALIDATE
	[kontaktName, kontaktNachricht, kontaktMail].forEach(function(_self) {
		if(_self.value === "") {
			kontaktSenden.style.visibility = '';
			_self.addClass("form__error");
			appendModal("Unvollständige Angabe: " + _self.placeholder, 3000, "error");
			loader(0);
		}
	});
	//SEND
	if(kontaktNachricht.value && kontaktName.value && kontaktMail.value) {
		re = /\S+@\S+\.\S+/
		if(!re.test(kontaktMail.value)) {
			appendModal("eMail Adresse ungültig!", 2000, "error");
			kontaktSenden.style.visibility = '';
			loader(0);
			return;
		}
		mail = {
			"key": api,
			"message": {
				"text": kontaktNachricht.value,
				"subject": "GLOSSBOSS Kontaktanfrage",
				"from_email": kontaktMail.value,
				"from_name": kontaktName.value,
				"to": [
				{
					//"email": "mail@glossboss.de",
					"email": selectedGlossboss.Mail,
					"name": selectedGlossboss.Name,
					"type": "to"
				}
				],
				"headers": {
					"Reply-To": kontaktMail.value
				}
			},
			"async": false,
			"ip_pool": "Main Pool"
		};
		ajax("https://mandrillapp.com/api/1.0/messages/send.json", "POST", mail, function(data) {
			loader(1);
			if(data[0].status === "sent") {
				kontaktSenden.style.visibility = "hidden";
				appendModal("Danke für deine eMail! Wir werden so schnell wie möglich darauf antworten.", 4500);
				loader(0);
			} else {
				appendModal("Es gab ein Problem mit unseren eMail-Server. Bitte versuch es später nochmal oder schreibe direkt an mail@glossboss.de", 4000, "error")
				loader(0);
			}
		}, true);
	}
}
kontaktInputs.style.opacity = ".3";
kontaktSenden.disabled = true;
selectGlossboss.forEach(function(self) {
	self.addEventListener("change", function(self) {
		kontaktInputs.style.opacity = "1";
		kontaktSenden.disabled = false;
		selectedGlossboss.Mail = $(".selectGlossboss input[name=glossboss]:checked").value;
		selectedGlossboss.Name = $(".selectGlossboss input[name=glossboss]:checked").getAttribute("data-boss");
	});
});
kontaktSenden.addEventListener('click', function(e) {
	e.preventDefault();
	kontaktSubmit();
});


var
	linklist              = $("#linklist"),
	linklistAnchor        = $$("#linklist a"),
	toggleMenuBox         = $("#toggleMenu"),
	docHeight             = window.innerHeight,
	docWidth              = window.innerWidth,
	contImage             = $$(".post--content p img"),
	breadtop              = $(".hamburger li:nth-child(1)"),
	beef                  = $(".hamburger li:nth-child(2)"),
	breadbottom           = $(".hamburger li:nth-child(3)"),
	linklistMaxHeight     = '230px',
	postsToLoad           = $$('.post--list li'),
	dellocalStorage       = $('.dellocalStorage'),
	localStorageContainer = $('.localStorageContainer'),
	shareCounter          = $('#sharecounter'),
	showComments          = $('.showCommentsContainer'),
	eastereggNavbar       = $('#eastereggNavbar'),
	searchReset           = $('#search_reset'),
	searchModal           = $('.open_search'),
	headerStyle           = $('#header-style'),
	scrollTop             = $('.scroll-top'),
	postSharing           = $('.post--sharing'),
	pageHeading           = $('.page-heading'),
	activeScrollResize    = false;

// (function(ps) {
	if(postSharing && navigator.userAgent.match(/(iPhone)/g)) {
		var wA = $(".share--whatsapp");
		wA.style.display = "inline-block";
		wA.href = "WhatsApp://send?text=" + document.title + ": " + location.href;
	}
// })(postSharing);

// (function(st) {
// 	if(st) {
		scrollTop.addEventListener('click', function() {
			jumpTo(linklist);
		});
// 	}
// })(scrollTop);

(function(ee, ph) {
	if(ph) {
		var timerEE;
		ph.addEventListener('mouseup', function() {
			clearTimeout(timerEE);
			return false;
		});
		ph.addEventListener('mousedown', function() {
			timerEE = window.setTimeout(function() {
				$$('.post--list li').forEach(function(e) {
					e.addClass('eastereggNavbar');
				})
			}, 2000);
		});
	}
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
				$$("*").forEach(function(e) {
					e.style.backgroundColor = augenkrebs[Math.floor(Math.random()*(augenkrebs.length + 1))];
				});
			}, 150);
			
		});
	}
})(eastereggNavbar, pageHeading);

(function(rndhd) {
	if(rndhd) {
		var headerImages = ["merc-8.jpg", "1mcoupe.jpg", "530dteamwork.jpg", "965turbo.jpg", "9914s1.jpg", "997cabrio.jpg", "991turbos.jpg", "997grau.jpg", "997rot.jpg", "alfagtv.jpg", "audir8.jpg", "audis5.jpg", "bmw2002.jpg", "eosschwarz.jpg", "golf7gtd.jpg", "lotuselise.jpg", "m3csl.jpg", "shelby.jpg", "mclaren.jpg"];
		//headerGradient = "linear-gradient(HSLA(197, 100%, 49%,.6),HSLA(197, 100%, 49%,.9))";
		random = Math.floor(Math.random()*(headerImages.length - 1));
		headerImagesUrl = "https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/" + headerImages[random];
		headerStyle.innerHTML = 'header {background: '+ headerGradient +', url('+ headerImagesUrl +') center 50%; background-size:cover}';
	}
})(randomHeader);

(function() {
	if(location.href.indexOf("/preview/") !== -1) {
		postContent = $(".post--content");
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

// (function(sc) {
// 	if(sc) {
		showComments.addEventListener('click', function() {
			var disqus_shortname = 'glossboss';
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
			showComments.style.display = "none";
		});
// 	}
// })(showComments);

linklist.style.maxHeight = linklistMaxHeight;

// if ( postsToLoad ) {

// 	postsToLoad.forEach(function(post) {

// 			checkRead(post.getAttribute("data-read"), post);

// 	});
// }

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
function updateHeader() {
	content = $('#CONTENT');
	header = $('header');
	headerHeight = header.offsetHeight - 5;
	scrolled = window.scrollY;
	content.style.margin = headerHeight + "px 0 0 0";
	// opacityHeader = 1 - (scrolled / headerHeight) + .2;
	// scaleHeader = scrolled / 100 * .1 + 1;
	// if (scaleHeader > 1) {
	// 	header.style.transform = "scale(" + scaleHeader +")"
	// 	header.style.webkitTransform = "scale(" + scaleHeader +")"
	// 	header.style.MozTransform = "scale(" + scaleHeader +")"
	// 	header.style.opacity = opacityHeader;
	// 	//if(scrolled > 20) header.style.top = "-" + scrolled*.7 + "px";
	// }
}
//updateHeader();
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
				$('#search-input').value = '';
				$('#results-container').innerHTML = '';
			})
		}
	})(searchReset);
	
	$('#searchWrapper').style.display = 'block';
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
	//updateHeader();

});

(function(sc) {
	if(sc) {
		try {
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
				try {
					if((xhrSliced.readyState == 4 && xhrSliced.status == 200) && (xhr.readyState == 4 && xhr.status == 200) && (getShares && getSharesSliced)) {
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
				catch(e) {
					console.log("Share Error: " + e);
				}
			}
			xhr.open("GET", getSharesUrl);
			xhr.send();
			xhrSliced.open("GET", getSharesUrlSliced);
			xhrSliced.send(); 
		}
		catch(e) {
			console.error("Shares Error: " + e);
		}
	}
})(shareCounter);

// (function(lsc) {
// 	if(lsc) {
// 		for ( var i = 0; i < localStorage.length; i++) {
// 		localStorageContainer.innerHTML += '<li>' + localStorage.key(i) + ' - ' + localStorage.getItem(localStorage.key(i)) + '</li>';
// 		}

// 		if(localStorage.length === 0) {
// 			localStorageContainer.innerHTML = 'Keine Daten vorhanden.';
// 			dellocalStorage.hide();
// 		}

// 		dellocalStorage.addEventListener('click', function(e) {
// 			e.preventDefault();
// 			localStorage.clear();
// 			localStorageContainer.innerHTML = 'Alle Daten erfolgreich gelöscht!';
// 		});
// 	}
// })(localStorageContainer);

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

var teil1          = $("#mischungInput1"),
teil2              = $("#mischungInput2"),
ergebnis           = $("#mischungResult"),
ergebnisML         = $("#mischung--highlight"),
getMischungInputs  = $$("#mischungsrechner input"),
header             = $("#mischung--heading"),
predefinedMischung = $$('.mischungenpredefined');

updateMischung = function(predefined) {
  flascheVal = $('input[type="radio"]:checked');
  if(predefined) {
	teil1.value = predefined.teil1;
	teil2.value = predefined.teil2;
  }

  if( teil1.value && teil2.value && flascheVal.value ) {

	if(ergebnis.style.display !== 'block') jumpTo( header );

	gesamt        = parseInt(teil1.value) + parseInt(teil2.value);
	step          = flascheVal.value / gesamt;
	
	result1       = Math.round(step*teil1.value).toFixed(2);
	result2       = Math.round(step*teil2.value).toFixed(2);
	
	result1Finish = result1.slice(0,result1.length-3);
	result2Finish = result2.slice(0,result2.length-3);

	ergebnis.style.display = 'block';
	ergebnis.style.background = '#49fb35';
	
	setTimeout(function() {

	  ergebnis.addClass("mischungsDelay");
	  ergebnis.style.background = '#fff';

	},100);
	ergebnisML.innerHTML = result1Finish + "ml:" + result2Finish + "ml";

  }

};

// if(getMischungInputs) {
	predefinedMischung.forEach(function(_self) {
		_self.addEventListener('click', function() {
			content = _self.innerHTML.split(':');
			preDefinedvalues = { teil1: content[0], teil2: content[1]};
			updateMischung(preDefinedvalues);
	});
});

getMischungInputs.forEach(function(el) {
	el.addEventListener('change', function() {
		ergebnis.removeClass("mischungsDelay");
		updateMischung();

		});
	});
// }

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
		jumpTo($("#loadmoreajax"));
		$("#loadmoreajax").click();
	},50);
});

window.addEventListener("hashchange", function() {
	loader(true);
	router.checker(location.hash);
});

window.addEventListener("load", function() {
	loader(true);
	router.checker(location.hash);
});

!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module){module.exports=function(){function receivedResponse(xhr){return 200==xhr.status&&4==xhr.readyState}function handleResponse(xhr,callback){xhr.onreadystatechange=function(){if(receivedResponse(xhr))try{callback(null,JSON.parse(xhr.responseText))}catch(err){callback(err,null)}}}var self=this;self.load=function(location,callback){var xhr=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");xhr.open("GET",location,!0),handleResponse(xhr,callback),xhr.send()}}},{}],2:[function(require,module){function FuzzySearchStrategy(){function createFuzzyRegExpFromString(string){return new RegExp(string.split("").join(".*?"),"gi")}var self=this;self.matches=function(string,crit){return"string"!=typeof string?!1:(string=string.trim(),!!string.match(createFuzzyRegExpFromString(crit)))}}module.exports=new FuzzySearchStrategy},{}],3:[function(require,module){function LiteralSearchStrategy(){function doMatch(string,crit){return string.toLowerCase().indexOf(crit.toLowerCase())>=0}var self=this;self.matches=function(string,crit){return"string"!=typeof string?!1:(string=string.trim(),doMatch(string,crit))}}module.exports=new LiteralSearchStrategy},{}],4:[function(require,module){module.exports=function(){function findMatches(store,crit,strategy){for(var data=store.get(),i=0;i<data.length&&matches.length<limit;i++)findMatchesInObject(data[i],crit,strategy);return matches}function findMatchesInObject(obj,crit,strategy){for(var key in obj)if(strategy.matches(obj[key],crit)){matches.push(obj);break}}function getSearchStrategy(){return fuzzy?fuzzySearchStrategy:literalSearchStrategy}var self=this,matches=[],fuzzy=!1,limit=10,fuzzySearchStrategy=require("./SearchStrategies/fuzzy"),literalSearchStrategy=require("./SearchStrategies/literal");self.setFuzzy=function(_fuzzy){fuzzy=!!_fuzzy},self.setLimit=function(_limit){limit=parseInt(_limit,10)||limit},self.search=function(data,crit){return crit?(matches.length=0,findMatches(data,crit,getSearchStrategy())):[]}}},{"./SearchStrategies/fuzzy":2,"./SearchStrategies/literal":3}],5:[function(require,module){module.exports=function(_store){function isObject(obj){return!!obj&&"[object Object]"==Object.prototype.toString.call(obj)}function isArray(obj){return!!obj&&"[object Array]"==Object.prototype.toString.call(obj)}function addObject(data){return store.push(data),data}function addArray(data){for(var added=[],i=0;i<data.length;i++)isObject(data[i])&&added.push(addObject(data[i]));return added}var self=this,store=[];isArray(_store)&&addArray(_store),self.clear=function(){return store.length=0,store},self.get=function(){return store},self.put=function(data){return isObject(data)?addObject(data):isArray(data)?addArray(data):void 0}}},{}],6:[function(require,module){module.exports=function(){var self=this,templatePattern=/\{(.*?)\}/g;self.setTemplatePattern=function(newTemplatePattern){templatePattern=newTemplatePattern},self.render=function(t,data){return t.replace(templatePattern,function(match,prop){return data[prop]||match})}}},{}],7:[function(require){!function(window){"use strict";function SimpleJekyllSearch(){function initWithJSON(){store.put(opt.dataSource),registerInput()}function initWithURL(url){jsonLoader.load(url,function(err,json){err?throwError("failed to get JSON ("+url+")"):(store.put(json),registerInput())})}function throwError(message){throw new Error("SimpleJekyllSearch --- "+message)}function validateOptions(_opt){for(var i=0;i<requiredOptions.length;i++){var req=requiredOptions[i];_opt[req]||throwError("You must specify a "+req)}}function assignOptions(_opt){for(var option in opt)opt[option]=_opt[option]||opt[option]}function isJSON(json){try{return json instanceof Object&&JSON.parse(JSON.stringify(json))}catch(e){return!1}}function emptyResultsContainer(){opt.resultsContainer.innerHTML=""}function appendToResultsContainer(text){opt.resultsContainer.innerHTML+=text}function registerInput(){opt.searchInput.addEventListener("keyup",function(e){return 0==e.target.value.length?void emptyResultsContainer():void render(searcher.search(store,e.target.value))})}function render(results){if(emptyResultsContainer(),0==results.length)return appendToResultsContainer(opt.noResultsText);for(var i=0;i<results.length;i++)appendToResultsContainer(templater.render(opt.searchResultTemplate,results[i]))}var self=this,requiredOptions=["searchInput","resultsContainer","dataSource"],opt={searchInput:null,resultsContainer:null,dataSource:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',noResultsText:"No results found",limit:10,fuzzy:!1};self.init=function(_opt){validateOptions(_opt),assignOptions(_opt),isJSON(opt.dataSource)?initWithJSON(opt.dataSource):initWithURL(opt.dataSource)}}var Searcher=require("./Searcher"),Templater=require("./Templater"),Store=require("./Store"),JSONLoader=require("./JSONLoader"),searcher=new Searcher,templater=new Templater,store=new Store,jsonLoader=new JSONLoader;window.SimpleJekyllSearch=new SimpleJekyllSearch}(window,document)},{"./JSONLoader":1,"./Searcher":4,"./Store":5,"./Templater":6}]},{},[7]);

});
