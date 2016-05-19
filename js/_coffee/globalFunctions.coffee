appendModal = (text, time, type) ->
  modalWrap = $(".wrap-modal")
  modal = document.createElement "div"

  modal.innerText = text
  modal.addClass "modal"
  modal.addClass "modal-#{type}"

  setTimeout ( ->
    modal.removeClass "modal-show"
    setTimeout ( ->
      modalWrap.removeChild modal
    ), 250
  ), time

loader = (toggle) ->
  me = $ "#loading"
  if toggle
    me.fadeIn 250
  else
    me.fadeOut 250

searchRender = () ->
  $('#search_reset').on "click", ->
    $("#search-input").html ''
    $("#results-container").html ''
