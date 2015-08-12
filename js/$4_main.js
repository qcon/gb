(function main(w, d) {
	var linklist = $("#linklist")
	, toggleMenu = $("#toggleMenu")
	, breadTop = $(".hamburger li:nth-child(1)")
	, beef = $(".hamburger li:nth-child(2)")
	, breadBottom = $(".hamburger li:nth-child(3)")
	, shareCounter = $("#sharecounter")
	, easterEggNavbar = $("#eastereggNavbar")
	, searchReset = $("#search_reset")
	, postSharing = $(".post--sharing")
	, scrollTop = $(".scroll-top")
	, showComments = $(".showCommentsContainer")
	, pageHeading = $(".page-heading")
	, linklistMaxHeight = "230px";

	var addWhatsAppShareButton = (function() {
		if(postSharing && navigator.userAgent.match(/(iPhone)/g)) {
			var whatsAppButton = $(".share--whatsapp");
			whatsAppButton.style("display", "inline-block");
			whatsAppButton.href = "WhatsApp://send?text=" + document.title + ": " + location.href;
		}
	})();

	var addEvents = (function() {

		// Scotty, beam me up
		scrollTop.on("click", function() {
			linklist.scrollTo();
		});

		// just load Disqus Comments, when the user wants to
		// PEEERRRFFRFRF
		showComments.on("click", function() {
			var disqus_shortname = 'glossboss';
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
			showComments.style("display", "none");
		});  

		toggleMenu.on("click", updateMenu);
		window.addEventListener("resize", updateMenu);


	})();

	// Private Functions

	var updateMenu = (function() {
		var docHeight = w.innerHeight;
		var docWidth = w.innerWidth;

		(docWidth >= 750) ? linklist.style("maxHeight", linklistMaxHeight) : hamburgerToggle();
	})();
	function hamburgerToggle(tgl) {
		var expand = function() {
			linklist.style("maxHeight", linklistMaxHeight);
			breadBottom.addClass("hidden");
			breadTop.addClass("rot45deg");
			beef.addClass("rot-45deg");
		};
		var close = function() {
			linklist.style("maxHeight", "0");
			breadbottom.removeClass("hidden");
			breadtop.removeClass("rot45deg");
			beef.removeClass("rot-45deg");
		};
		(toggleMenu.checked) ? expand() : close();
	}
})(window, document);