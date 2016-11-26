/* global $ */
const sliderItems = {}
let slidePos = 0
let sliderInt
let maxSliderImages = 0

const $img = $('#slider-item-img')
const $url = $('#slider-item-a')
const $sliderContainer = $('.slider')
const $sliderPosMarks = $('.slider-position-marks')
const sliderIntTime = 5000

function updateSliderMarkPos () {
  $sliderPosMarks.find('span').each((i, el) => {
    $(el).removeClass('active')
  })
  $(`.slider-position-marks span:nth-child(${slidePos + 1})`).addClass('active')
}

function swapImage () {
  updateSliderMarkPos()
  $img.fadeOut('fast', () => {
    $img.attr('src', sliderItems[slidePos].img)
    $url.attr('href', sliderItems[slidePos].url)
    $img.fadeIn('slow')
  })
}

function startSliderInterval () {
  clearInterval(sliderInt)
  sliderInt = setInterval(() => {
    nextImage(); // eslint-disable-line
  }, sliderIntTime)
}

function prevImage () {
  slidePos--
  if (slidePos < 0) slidePos = maxSliderImages - 1
  swapImage()
  startSliderInterval()
}
function nextImage () {
  slidePos++
  if (slidePos === maxSliderImages) {
    slidePos = 0
  }
  swapImage()
  startSliderInterval()
}
function initSlider () {
  $('.js-slider-images').each((i, el) => {
    sliderItems[i] = {
      img: $(el).attr('src'),
      url: $(el).attr('data-url')
    }
    maxSliderImages++
    $sliderPosMarks.append($('<span> </span>'))
  })
  $img.attr('src', sliderItems[0].img)
  $url.attr('href', sliderItems[0].url)
  $sliderContainer.removeClass('displayNone')
  startSliderInterval()
  updateSliderMarkPos()
}

$('.js-slide-prev').on('click', (e) => {
  e.preventDefault()
  prevImage()
})
$('.js-slide-next').on('click', (e) => {
  e.preventDefault()
  nextImage()
})

if ($('.slider').length > 0) initSlider()
