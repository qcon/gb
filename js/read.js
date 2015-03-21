	var ls = localStorage,
	read   = {
		init: function() {
			if (!ls.getItem(postName)) {
				ls.setItem(postName, Date());
				console.log("add func");
			} else {
				parseDate = new Date(ls.getItem(postName));
				console.log(parseDate.getDate() + "." + parseDate.getMonth()+1 + "." + parseDate.getFullYear());
			}
		}
	};