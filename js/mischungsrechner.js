const Mischungsrechner = {}

Mischungsrechner.initialize = () => {
  predefinedDil.on('click', function () {
    let content = this.innerHTML.split(':')
    predefinedValues = {
      part1: content[0],
      part2: content[1]
    }
    // set the 2 input values to the predefined ones
    part1.val(predefinedValues.part1)
    part2.val(predefinedValues.part2)
    Mischungsrechner.updateEvent()
  })
  mischungInputs.on('change', Mischungsrechner.updateEvent)
  mischungInputs.on('paste', Mischungsrechner.updateEvent)
}

Mischungsrechner.calculateDil = () => {
  let allParts, step, res1, res2, res1Finish, res2Finish, cResult, bottleValue,cPart1 = part1.val(),
    cPart2 = part2.val()
  bottleValue = Mischungsrechner.getBottleValue()

  allParts = parseInt(cPart1) + parseInt(cPart2)
  step = parseInt(bottleValue) / allParts

  res1 = Math.round(step * cPart1).toFixed(2)
  res2 = Math.round(step * cPart2).toFixed(2)

  res1Finish = res1.slice(0, res1.length - 3)
  res2Finish = res2.slice(0, res2.length - 3)
  // output = '' + res1Finish + 'ml:' + res2Finish + 'ml'
  output = `${res1Finish}ml:${res2Finish}ml`
  return output
}
Mischungsrechner.updateOutput = (output) => {
  result.show()
  resultMl.text(output)
}
Mischungsrechner.getBottleValue = () => {
  var bottleValue = $('input[type="radio"]:checked').val() || 0
  if (bottleValue > 0) {
    return bottleValue
  } else {
    return 0
  }
}
Mischungsrechner.shouldOutput = (force) => {
  var bottleValue = Mischungsrechner.getBottleValue()
  if (part1.val() > 0 && part2.val() > 0 && bottleValue > 0) {
    return true
  } else {
    return false
  }
}
Mischungsrechner.updateEvent = () => {
  var canIUpdateplz = Mischungsrechner.shouldOutput()
  if (canIUpdateplz) {
    Mischungsrechner.updateOutput(Mischungsrechner.calculateDil())
  }
}


$(() => {
  Mischungsrechner.initialize()
})
const part1 = $('#mischungInput1')
const part2 = $('#mischungInput2')
const result = $('#mischungResult')
const resultMl = $('#mischung--highlight')
const mischungInputs = $('#mischungsrechner input')
const header = $('#mischung--heading')
const predefinedDil = $('.mischungenpredefined')

let predefinedValues = {}
let output = ''
