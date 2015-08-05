(function() {
	var slice = Array.prototype.slice;
	$ = function(expr, con) {
		var el = typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
		return el || document.createElement("div");
	}

	$$ = function(expr, con) {
		return slice.call((con || document).querySelectorAll(expr));
	}
})