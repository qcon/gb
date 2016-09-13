/* global SimpleJekyllSearch, postJSONCache, loadingScreen */
const prepareSearch = () => {
  const searchWrapper = $('#searchWrapper');
  try {
    if (searchWrapper.length > 0) {
      $('#search-input').focus();
      $('#search_reset').on('click', () => {
        $('#search-input').val('');
        $('#results-container').html('');
      });
      searchWrapper.show();
      SimpleJekyllSearch.init({
        templateMiddleware(prop, value, template) {
          return template.classList.remove('displayNone');
        },
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        dataSource: '/posts.json',
        searchResultTemplate: '{card}',
        noResultsText: '<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>', // eslint-disable-line
        limit: 25,
        fuzzy: false,
      });
      if (location.search.length > 3) {
        loadingScreen(1);
        $('#search-input').val(location.search.substr(3, location.search.length));
        $.getJSON('/posts.json').then(() => {
          setTimeout(() => {
            SimpleJekyllSearch.renderExternal();
            loadingScreen(0);
          }, 200);
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
};
prepareSearch();
