var kontaktSenden   = _("#SENDEN"),
kontaktMessageError = _("#form_msg_error"),
kontaktMessage      = _("#form_msg"),
kontaktForm         = _(".kontakt__form"),
kontaktPostContent  = _(".post--content"),
kontaktLoading      = _("#loading"),
kontaktName         = _("#name"),
kontaktMail         = _("#xyz"),
kontaktNachricht    = _("#msg"),
api                 = "R61bXP70NEnJXC2c__cvgg";

kontaktSubmit = function() {
	//RESET
	kontaktName.removeClass("form__error");
	kontaktMail.removeClass("form__error");
	kontaktNachricht.removeClass("form__error");
	kontaktSenden.style.display = 'none';
	kontaktMessage.innerHTML = '';
	loader(1);

	//VALIDATE
	[kontaktName, kontaktNachricht, kontaktMail].forEach(function(_self) {
		if(_self.value === "") {
			kontaktSenden.style.display = '';
			_self.addClass("form__error");
		}
		loader(0);
	});
	//SEND
	if(kontaktNachricht.value && kontaktName.value && kontaktMail.value) {
		re = /\S+@\S+\.\S+/
		if(!re.test(kontaktMail.value)) {
			kontaktMessageError.innerHTML = '<span class="kontakt__error">eMail Adresse ungültig!</span>';
			kontaktMessageError.style.display = '';
			kontaktSenden.style.display = '';
			log("Mail ungültig!");
			loader(0);
			return;
		}
		mail = {
			"key": api,
			"message": {
				"text": kontaktNachricht.value,
				"subject": "GLOSSBOSS Kontaktanfrage",
				"from_email": kontaktMail.value,
				"from_name": kontaktName.value,
				"to": [
				{
				"email": "marvinmieth@icloud.com",
				"name": "Marvin Mieth",
				"type": "to"
				}
				],
				"headers": {
				"Reply-To": kontaktMail.value
				}
			},
			"async": false,
			"ip_pool": "Main Pool"
		};
		ajax("https://mandrillapp.com/api/1.0/messages/send.json", "POST", mail, function(data) {
			if(data[0].status === "sent") {
				kontaktMessageError.style.display = 'none';
				kontaktForm.style.display = 'none';
				kontaktPostContent.style.display = 'none';
				kontaktMessage.innerHTML = '<span class="kontakt__success">Danke für deine eMail!</span>';

			} else {
				kontaktMessageError.style.display = '';
				kontaktMessageError.innerHTML = '<span class="kontakt__error">Es gab ein Problem mit unseren eMail-Server. Bitte versuch es später nochmal oder schreibe direkt an mail@glossboss.de</span>';
			}
			loader(0);
		}, true);
	}
}

// kontaktSubmit = function() {
// 	jumpTo( kontaktMessage );
// 	var kontaktName  = _("#name"),
// 	kontaktMail      = _("#xyz"),
// 	kontaktNachricht = _("#msg");

// 	kontaktName.removeClass("form__error");
// 	kontaktMail.removeClass("form__error");
// 	kontaktNachricht.removeClass("form__error");

// 	kontaktLoading.style.opacity = '1';

// 	kontaktSenden.style.display = 'none';

// 	kontaktMessage.innerHTML = '';

// 	var data = new FormData();
// 	data.append('name', kontaktName.value);
// 	data.append('xyz', kontaktMail.value);
// 	data.append('msg', kontaktNachricht.value);

// 	var xhr = new XMLHttpRequest();
// 	xhr.open('POST', 'mailajax.php', true);
	
// 	xhr.onload = function() {

// 		_self = JSON.parse(this.responseText);

// 		if(!_self.success) {

// 			kontaktLoading.style.opacity = '0';

// 			if(_self.errors.name) {

// 				kontaktMessageError.innerHTML = '<span class="kontakt__error">' + _self.errors.name + '</span>';
// 				kontaktMessageError.style.display = '';

// 				kontaktSenden.style.display = '';

// 				if( _self.errors.badmail ) {

// 					kontaktMail.addClass("form__error");

// 				}
// 				if( _self.errors.badname ) {

// 					kontaktName.addClass("form__error");

// 				}
// 				if( _self.errors.badmsg ) {
// 					kontaktNachricht.addClass("form__error");
// 				}
// 			}
// 		} else {
// 			kontaktLoading.style.opacity = '0';
// 			kontaktMessageError.style.display = 'none';
// 			kontaktForm.style.display = 'none';
// 			if( !_self.phpmail_bad ) {
// 				kontaktPostContent.style.display = 'none';
// 				kontaktMessage.innerHTML = '<span class="kontakt__success">Danke für deine eMail!</span>';
// 			} else {
// 				kontaktMessageError.style.display = '';
// 				kontaktMessageError.innerHTML = '<span class="kontakt__error">Es gab ein Problem mit unseren eMail-Server. Bitte versuch es später nochmal oder schreibe direkt an mail@glossboss.de</span>';
// 			}
// 		}

// 	};

// 	xhr.send(data);

// };
if( kontaktSenden ) {
	kontaktSenden.addEventListener('click', function(e) {
		e.preventDefault();
		kontaktSubmit();
	});
}
