/* global $ */
const $sideMenu = $('#sidemenu');
const $fullPage = $('#fullpage');
const $toggleNav = $('#mainnav');
const $closeSideMenu = $('.js-close-sidemenu');
const $body = $('body');
const SideMenu = {};
SideMenu.close = () => {
  $sideMenu.removeClass('menuOut');
  $fullPage.off('click', SideMenu.closeFullpage);
  $body.off('keydown', SideMenu.closeOnEscape);
  $fullPage.removeClass('opacity03');
  // ARIA
  $toggleNav.attr('aria-expanded', 'false');
  $toggleNav.attr('aria-label', 'Menü');
  $toggleNav.attr('aria-controls', 'sidemenu');

  $sideMenu.attr('aria-hidden', 'true');
  $sideMenu.attr('aria-labelledby', 'mainnav');
};
SideMenu.open = (event) => {
  event.stopPropagation();
  event.preventDefault();
  if (!$sideMenu.hasClass('menuOut')) {
    $fullPage.addClass('opacity03');
    $sideMenu.addClass('menuOut');
  }
  setTimeout(() => {
    $toggleNav.attr('aria-expanded', 'true');
    $sideMenu.attr('aria-hidden', 'false');
    $fullPage.on('click', SideMenu.closeFullpage);
    $body.on('keydown', SideMenu.closeOnEscape);
    $closeSideMenu.on('click', SideMenu.close);
  }, 100);
};
SideMenu.closeFullpage = (event) => {
  event.preventDefault();
  SideMenu.close();
};
SideMenu.closeOnEscape = (event) => {
  if (event.which === 27) {
    event.stopPropagation();
    event.preventDefault();

    SideMenu.close();
  }
};
SideMenu.initialize = () => {
  SideMenu.close();
  $toggleNav.on('click', SideMenu.open);
};
SideMenu.initialize();
