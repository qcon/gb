(window.jQuery || document.write('<script src="/dist/jq.js"><\/script>'));

    var mainnav        = $("#mainnav"),
    mainnavOffset      = mainnav.offset(),
    linklist           = $(".linklist"),
    svgicon            = $(".header__menu--icontoggle"),
    toggleMenuBox      = $("#toggleMenu"),
    winHeight          = $(window).height(),
    contOverlay        = $(".containeroverlay"),
    contOverlayInner   = $(".containeroverlay-inner"),
    contImage          = $(".post--content p img"),
    breadtop           = $(".hamburger li:nth-child(1)"),
    beef               = $(".hamburger li:nth-child(2)"),
    breadbottom        = $(".hamburger li:nth-child(3)"),
    activeScrollResize = false,
    closeOverlay       = $("#closeOverlay");

contOverlayToggle = function(task, settings) {

    if (task === 'image') {
        srctemp = settings.attr("src");
        contOverlayInner.html("<img src=" + srctemp + " id='parse'><div class='containeroverlay-alt'>");
        if (settings.attr("alt").length != 0) {


            $(".containeroverlay-alt").text(settings.attr("alt"));

        }
    }
    if (task === 'other') {
        
        console.log("other");
        filetoLoad = settings || '/404.html';
        contOverlayInner.load(filetoLoad);
    }

    contOverlay.css("top",winHeight + "px");
    contOverlay.css("display","table");
    contOverlay.animate({ top:0 }, 350, "easeOutCirc");

    contOverlay.on('click', function() {
        contOverlay.animate({ top: winHeight + "px" }, 320, "easeInCirc", function() {
            contOverlay.css("display","none");
        });
    });
};

// Klick auf Image im Content-Bereich lässt ein Fullscreen Div von unten
// hochsliden mit dem vergrößerten Bild
contImage.on('click', function() {

    contOverlayToggle('image', $(this));

});


menuHamburgerToggle = function() {

    if(toggleMenuBox.prop("checked")) {

        linklist.slideDown('250');
        breadbottom.addClass("hidden");
        breadtop.addClass("rot45deg");
        beef.addClass("rot-45deg");

    } else {

        linklist.slideUp('250');
        breadtop.removeClass("rot45deg");
        beef.removeClass("rot-45deg");
        breadbottom.removeClass("hidden");

    }
};

updateMenu = function(activeStartUp) {

    if(activeScrollResize || activeStartUp) {

        if( $(window).width() >= 750 ) {

            linklist.slideDown();
            mainnav.removeClass("nav-fixed");

        } else {
            
            if( $(window).scrollTop() > mainnavOffset.top ) {

                mainnav.addClass("nav-fixed");

            } else {

                mainnav.removeClass("nav-fixed");
            }

            menuHamburgerToggle();
            toggleMenuBox.on('click', function(){

                menuHamburgerToggle();

            });
        }
    }
    activeScrollResize = false;
};

updateMenu(activeStartUp = true);
$(window).on("resize", function() {

    setTimeout(function() {
        updateMenu(true);
    },450);

});
$(window).on("scroll", function(){

    setTimeout(function() {
        updateMenu(true);
    },450);

});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-52307693-1', 'auto');ga('send', 'pageview');
