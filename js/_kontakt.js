var kontaktSenden   = $("#SENDEN"),
kontaktMessage      = $("#form_msg"),
kontaktForm         = $(".kontakt__form"),
kontaktLoading      = $("#loading"),
kontaktName         = $("#name"),
kontaktMail         = $("#xyz"),
kontaktNachricht    = $("#msg"),
api                 = "R61bXP70NEnJXC2c__cvgg";

kontaktSubmit = function() {
	//RESET
	kontaktName.removeClass("form__error");
	kontaktMail.removeClass("form__error");
	kontaktNachricht.removeClass("form__error");
	kontaktSenden.style.visibility = 'hidden';
	kontaktMessage.innerHTML = '';
	loader(1);

	//VALIDATE
	[kontaktName, kontaktNachricht, kontaktMail].forEach(function(_self) {
		if(_self.value === "") {
			kontaktSenden.style.visibility = '';
			_self.addClass("form__error");
			appendModal("Unvollständige Angabe: " + _self.placeholder, 3000, "error");
			loader(0);
		}
	});
	//SEND
	if(kontaktNachricht.value && kontaktName.value && kontaktMail.value) {
		re = /\S+@\S+\.\S+/
		if(!re.test(kontaktMail.value)) {
			appendModal("eMail Adresse ungültig!", 2000, "error");
			kontaktSenden.style.visibility = '';
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
					"email": "mail@glossboss.de",
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
			loader(1);
			if(data[0].status === "sent") {
				kontaktSenden.style.visibility = "hidden";
				appendModal("Danke für deine eMail! Wir werden so schnell wie möglich darauf antworten.", 4500);
				loader(0);
			} else {
				appendModal("Es gab ein Problem mit unseren eMail-Server. Bitte versuch es später nochmal oder schreibe direkt an mail@glossboss.de", 4000, "error")
				loader(0);
			}
		}, true);
	}
}
if( kontaktSenden ) {
	kontaktSenden.addEventListener('click', function(e) {
		e.preventDefault();
		kontaktSubmit();
	});
}
