const loadingScreen = (toggle) => {
  const loadingElement = $('#loading')
  if(toggle) {
    loadingElement.show()
  } else {
    loadingElement.hide()
  }
}

const prepareSearch = () => {
  const searchWrapper = $('#searchWrapper')
  try {
    if(searchWrapper.length > 0) {
      $('#search_reset').on('click', () => {
        $('#search-input').val('')
        $('#results-container').html('')
      })
      searchWrapper.show()
      SimpleJekyllSearch.init({
        // templateMiddleware: function(prop, value, template) {
        //   console.log(template);
        //   return template.classList.remove("displayNone")
        // },
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        dataSource: postJSONCache,
        searchResultTemplate: '{card}',
        noResultsText: '<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>',
        limit: 25,
        fuzzy: false,
      });
    }
  } catch (e) {
    // NOOOOOOOOPE
  }
}
prepareSearch()