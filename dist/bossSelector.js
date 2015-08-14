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