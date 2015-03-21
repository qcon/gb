(function() {
	/**
	 * CSS-like Selector for DOM Elements
	 * @param  {[String]} elem [CSS Selector]
	 * @return {[Array]}      [Array from the NodeList]
	 */
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

			for( var i = 0; i < getElements.length; i++ ) {

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

					for( var i = 0; i < getClassNames.length; i++ ) {

						returnNode.push( getClassNames[i] );

					}
					break;
				//get the tag names
				default:

					getTagNames = document.getElementsByTagName(elem);
					for( var i = 0; i < getTagNames.length; i++ ) {

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
	}
	/**
	 * add a CSS Class to Element
	 * @param {[type]} className
	 */
	Element.prototype.addClass = function( className ) {

		_addClass = function( elem ) {

			if( elem.classList ) {

				elem.classList.add(className);

			} else {

				elem.className += ' ' + className
			}
		}
		return _addClass( this )
	}


	Element.prototype.removeClass = function( className ) {

		_removeClass = function( elem ) {

			if ( elem.classList ) {

				elem.classList.remove(className);

			} else {

				elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}
		return _removeClass( this )
	}

	Element.prototype.hide = function () {

		_hide = function( elem ) {

			elem.style.display = 'none';
		}

		return _hide( this );
	}
	
})();
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