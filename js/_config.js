(function() {

	var debug = true,
	ls        = localStorage,
	i, conf, postArr, hash;

	conf = {
		maxPostReload: 5,
		maxIndexPosts: 10
	};

	_ = function( elem ) {

		elemSliced   = elem.slice(1, elem.length);
		elemSelector = elem.charAt(0);
		returnNode   = [];

		if ( /[^\w#.-]/.test(elem) ) {
			//do the querySelectorAll, if:
			//* there is a whitespace
			//* there is a special char except # . -
			//example: "input[type="radio"]:checked" OR
			//".post-content p img"

			getElements = document.querySelectorAll(elem);
			getLength = getElements.length;

			for( i = 0; i < getElements.length; i++ ) {

				returnNode.push(getElements[i]);

			}

		} else {

			switch ( elemSelector ) {
				//get the IDs
				case '#':

					returnNode.push(document.getElementById( elemSliced ));
					break;
				//get the classes
				case '.':

					getClassNames = document.getElementsByClassName( elemSliced );

					for( i = 0; i < getClassNames.length; i++ ) {

						returnNode.push( getClassNames[i] );

					}
					break;
				//get the tag names
				default:

					getTagNames = document.getElementsByTagName(elem);
					for( i = 0; i < getTagNames.length; i++ ) {

						returnNode.push( getTagNames[i] );

					}
					break;
			}
		}

		returnNodeFinal = ( returnNode.length > 1 ) ? returnNode : returnNode[0];

		if( returnNodeFinal ) {

			return returnNodeFinal;

		} else {

			return;

		}
	};

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

		_self = _("#loading");

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
			window.scrollTo(0,theOffset.top + document.body.scrollTop - 10);
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

		_(".linklistloop a").forEach(function(_self) {

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

	/**
	 * check if this article is already read
	 * @param  {[String]} post [the Post]
	 * @param  {[String]} li   [add read-mark to the Listitem]
	 */
	checkRead = function( post, li ) {

		if(ls.getItem(post)) {

			li.addClass("is-viewed");
			parseDate = new Date(ls.getItem(post));

			tag = parseDate.getDate();
			monat = parseDate.getMonth()+1;
			jahr = parseDate.getFullYear();

			li.querySelectorAll(".post--read")[0].textContent = 'Gelesen am: ' + tag + '.' + monat + '.' + jahr + ' | ';
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

			if( _("#indexContainer") && !hash ) {
				this.parser('index', 'Die neusten Beiträge', true);

			}
		},
		parser: function( hash, title, isIndex ) {
			hashNice = hash.charAt(0).toUpperCase() + hash.slice(1,hash.length);
			title = title || hashNice;

			loader(true);

			postList = _(".post--list");
			postContainer = _("#post--list__container");
			pageHeading = _("#page-heading");
			loadmoreButton = _("#loadmoreajax");

			postList.innerHTML = '';
			postContainer.addClass("opacity-0");

			pageHeading.addClass("opacity-0");
			pageHeading.textContent = title;

			xhr = new XMLHttpRequest();

			markActiveLinklist(hash);

			xhr.onreadystatechange = function(e) {

				if(xhr.readyState == 4 && xhr.status == 200) {

					post = JSON.parse(xhr.responseText,"text/json");
					numCat = 0;
					postArr = [];

					/**
					 * loop through all posts and put them in an array
					 * if the category is identical with the hash, then
					 * append it to the postlist
					 */
					for( var i = 0; i < post.length; i++ ) {
						if(post[i].category === hash || (isIndex) || hash === 'alle') {


							if(numCat <= conf.maxIndexPosts) {
								_(".post--list").innerHTML += post[i].card;
								numCat++;
							}
							postArr.push(post[i].card);
						}
					}
					_(".post--list li").forEach(function(post, i) {

						checkRead(post.getAttribute("data-read"), post);

					});
					loader(false);
					pageHeading.removeClass("opacity-0");
					postContainer.removeClass("opacity-0");

					if(_(".post--list li").length <= conf.maxIndexPosts) {

						loadmoreButton.style.display = 'none';

					} else {

						loadmoreButton.style.display = 'block';
					}

				}
			};

			loadmoreButton.onclick = function(e) {
				e.preventDefault();
				e.stopPropagation();
				postListLI = _(".post--list li");
				if( isIndex && location.hash != 'alle' ) {
					location.hash = 'alle';
				}
				var showDelayTime = 0;
				showDelay = function(p, t) {
					setTimeout(function() {
						_(".post--list li")[p].removeClass("displayNone");
					}, t);

				};

				for (var i = 0; i < conf.maxPostReload; i++) {
					_(".post--list").innerHTML += postArr[numCat];
					_(".post--list li")[numCat].addClass('displayNone');
					showDelayTime += 100;
					showDelay(numCat, showDelayTime);
					numCat++;

					if(!postArr[numCat]) {
						loadmoreButton.style.display = 'none';
						return;
					}
				}

				_(".post--list li").forEach(function(post, i) {

						checkRead(post.getAttribute("data-read"), post);

				});

				return;
			};

			progressBar.style.display = 'block';
			progressBar.style.width = '5%';
			xhr.addEventListener('progress', function(_self) {

				var progressBar = _('#progressBar');

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
			xhr.open("GET", "/posts.json", true);
			xhr.send();
		}

	};
})();
