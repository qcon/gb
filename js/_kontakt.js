var kontaktSenden   = _("#SENDEN"),
kontaktMessageError = _("#form_msg_error"),
kontaktMessage      = _("#form_msg"),
kontaktForm         = _(".kontakt__form"),
kontaktPostContent = _(".post--content"),
kontaktLoading = _("#loading");


if(kontaktLoading) kontaktLoading.style.opacity = '0';

kontaktSubmit = function() {

	jumpTo( kontaktMessage );

	var kontaktName  = _("#name"),
	kontaktMail      = _("#xyz"),
	kontaktNachricht = _("#msg");

	kontaktName.removeClass("form__error");
	kontaktMail.removeClass("form__error");
	kontaktNachricht.removeClass("form__error");

	kontaktLoading.style.opacity = '1';

	kontaktSenden.style.display = 'none';

	kontaktMessage.innerHTML = '';

	var data = new FormData();
	data.append('name', kontaktName.value);
	data.append('xyz', kontaktMail.value);
	data.append('msg', kontaktNachricht.value);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'mailajax.php', true);
	
	xhr.onload = function() {

		_self = JSON.parse(this.responseText);

		if(!_self.success) {

			kontaktLoading.style.opacity = '0';

			if(_self.errors.name) {

				kontaktMessageError.innerHTML = '<span class="kontakt__error">' + _self.errors.name + '</span>';
				kontaktMessageError.style.display = '';

				kontaktSenden.style.display = '';

				if( _self.errors.badmail ) {

					kontaktMail.addClass("form__error");

				}
				if( _self.errors.badname ) {

					kontaktName.addClass("form__error");

				}
				if( _self.errors.badmsg ) {
					kontaktNachricht.addClass("form__error");
				}
			}
		} else {
			kontaktLoading.style.opacity = '0';
			kontaktMessageError.style.display = 'none';
			kontaktForm.style.display = 'none';
			if( !_self.phpmail_bad ) {
				kontaktPostContent.style.display = 'none';
				kontaktMessage.innerHTML = '<span class="kontakt__success">Danke für deine eMail!</span>';
			} else {
				kontaktMessageError.style.display = '';
				kontaktMessageError.innerHTML = '<span class="kontakt__error">Es gab ein Problem mit unseren eMail-Server. Bitte versuch es später nochmal oder schreibe direkt an mail@glossboss.de</span>';
			}
		}

	};

	xhr.send(data);

};
if( kontaktSenden ) {

	kontaktSenden.addEventListener('click', function(e) {

		e.preventDefault();
		kontaktSubmit();

	});
}
