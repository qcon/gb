$.noConflict();


jQuery(document).ready ($) ->
  jx = $('#jqajaxhere')
  more = $('#loadmoreScript')
  allgemeinPOST = $('#allgemeinPOST')
  produkttestPOST = $('#produkttestPOST')
  pflegeberichtPOST = $('#pflegeberichtPOST')
  anleitungPOST = $('#anleitungPOST')
  actualCategory = null

  posts = null
  postDBFile = 'test.json'

  markAsActiveCategory = (category) ->
    $.each $('#catSwitch span'), ->
      if $(this).data('category') is category
        $(this).addClass('activeCat')
      else
        $(this).removeClass('activeCat')
      return



  loadMorePosts = (category, end = 5) ->
    start = jx.find('li').length
    markAsActiveCategory category
    unless actualCategory is category
      actualCategory = category
      start = 0
      jx.html ' '
    #console.log "Start: #{start} - End: #{end} - Category: #{category}"
    inc = 0
    $.each posts[category], (key, val) ->
      if key >= start and inc < end
        #console.log inc
        jx.append $(val.card).fadeIn 'slow'
        inc++
        return
    #return

   $.getJSON postDBFile, (data) ->
      posts = data

      #Data loaded, assign the category-click-handler
      allgemeinPOST.on 'click', ->
        loadMorePosts 'allgemein'
      anleitungPOST.on 'click', ->
        loadMorePosts 'anleitungen'
      pflegeberichtPOST.on 'click', ->
        loadMorePosts 'pflegeberichte'
      produkttestPOST.on 'click', ->
        loadMorePosts 'produkttest'
      return
  return