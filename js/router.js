
var router = {
	routes: [],
	add: function(hash, func) {
		this.routes.push({re: hash, func: func});
		return this;
	},
	checker: function(hash) {
		for(var i in this.routes) {
			var match = hash.match(this.routes[i].re);
			if(match) {
				match.shift();
				this.routes[i].func.apply({}, match);
				return this;
			}
		}
	}
},
postcontainer = $("#post--list__container");

var app = router;

app.add("/home", function() {
	postcontainer.append("home");
});

app.add("/about", function() {
	postcontainer.load("/callinclude/impressum.html");
	
});

app.add("/work", function() {
	postcontainer.load("/callinclude/kontakt.html");
	
});
$(window).on("load hashchange", function() {
	app.checker(location.hash);
});