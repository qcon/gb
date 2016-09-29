const askGlossbossToggleBtn = $('.askGlossbossToggle');
const askGlossbossContainer = $('.askGlossboss');
const askGlossbossSubmit = $('#askGlossboss-Submit');
const $form = $('#askGlossboss-Form');
const askGlossbossEmail = $('input[name=Email]');
const askGlossbossName = $('input[name=Name]');
const askGlossbossFrage = $('textarea[name=Frage]');
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(email);
}
function checkQuestion(q) {
  let nooope = 0;
  q.split('').map((char) => {
    if (char === '>' || char === '<') {
      nooope++;
    }
  });
  return (nooope >= 2);
}
function resetInputs() {
  askGlossbossEmail.removeClass('formerror');
  askGlossbossName.removeClass('formerror');
  askGlossbossFrage.removeClass('formerror');
}
function askGlossbossToggleContainer() {
  askGlossbossContainer.toggle('fast');
  askGlossbossToggleBtn.toggleClass('open');
  $('#askGlossboss-Name').focus();
}
function checkInputs() {
  let err = 0;
  if (checkQuestion(askGlossbossFrage.val())) {
    err++;
  }
  if (askGlossbossName.val().length <= 2) {
    askGlossbossName.addClass('formerror');
    err++;
  }
  if (askGlossbossFrage.val().length <= 2) {
    askGlossbossFrage.addClass('formerror');
    err++;
  }
  if (!validateEmail(askGlossbossEmail.val()) || askGlossbossEmail.val().length <= 2) {
    askGlossbossEmail.addClass('formerror');
    err++;
  }
  return err === 0;
}
askGlossbossToggleBtn.on('click', () => {
  askGlossbossToggleContainer();
});
askGlossbossSubmit.on('click', (e) => {
  e.preventDefault();
  resetInputs();

  if (checkInputs()) {
    $form.submit();
  }
});
$form.submit((e) => {
  e.preventDefault();
  $.post($form.attr('action'), $form.serialize()).then(() => {
    askGlossbossContainer.find('.askGlossboss-inner').html('<h1>Danke für deine Nachricht, wir werden bald antworten.</h1>'); //eslint-disable-line
    setTimeout(() => {
      askGlossbossToggleBtn.hide('fast');
      askGlossbossContainer.hide('fast');
    }, 2000);
  });
});
