/* global $ */
const part1 = $('#mischungInput1')
const part2 = $('#mischungInput2')
const result = $('#mischungResult')
const resultMl = $('#mischung--highlight')
const mischungInputs = $('#mischungsrechner input')
const predefinedDil = $('.mischungenpredefined')

let predefinedValues = {}
const Mischungsrechner = {}

Mischungsrechner.initialize = () => {
  predefinedDil.on('click', function x () {
    const content = $(this).html().split(':')
    predefinedValues = {
      part1: content[0],
      part2: content[1]
    }
    // set the 2 input values to the predefined ones
    part1.val(predefinedValues.part1)
    part2.val(predefinedValues.part2)
    Mischungsrechner.updateEvent()
  }).bind(this)
  mischungInputs.on('change', Mischungsrechner.updateEvent)
  mischungInputs.on('paste', Mischungsrechner.updateEvent)
}

Mischungsrechner.calculateDil = () => {
  const cPart1 = part1.val()
  const cPart2 = part2.val()
  const bottleValue = Mischungsrechner.getBottleValue()

  const allParts = parseInt(cPart1) + parseInt(cPart2)
  const step = parseInt(bottleValue) / allParts

  const res1 = Math.round(step * cPart1).toFixed(2)
  const res2 = Math.round(step * cPart2).toFixed(2)

  const res1Finish = res1.slice(0, res1.length - 3)
  const res2Finish = res2.slice(0, res2.length - 3)
  return `${res1Finish}ml:${res2Finish}ml`
}
Mischungsrechner.updateOutput = (output) => {
  result.show()
  resultMl.text(output)
}
Mischungsrechner.getBottleValue = () => {
  const bottleValue = $('input[type="radio"]:checked').val() || 0
  if (bottleValue > 0) {
    return bottleValue
  }
  return 0
}
Mischungsrechner.shouldOutput = () => {
  const bottleValue = Mischungsrechner.getBottleValue()
  if (part1.val() > 0 && part2.val() > 0 && bottleValue > 0) {
    return true
  }
  return false
}
Mischungsrechner.updateEvent = () => {
  const canIUpdateplz = Mischungsrechner.shouldOutput()
  if (canIUpdateplz) {
    Mischungsrechner.updateOutput(Mischungsrechner.calculateDil())
  }
}

$(() => {
  Mischungsrechner.initialize()
})
