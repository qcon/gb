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

router.add('alle', function() {

	router.parser("alle", 'Alle Beiträge');

	setTimeout(function() {

		jumpTo(_("#loadmoreajax"));
		_("#loadmoreajax").click();

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
