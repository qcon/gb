(function kontaktForm(w, d) {
	var send = $("#SENDEN")
	, kontaktMessage = $("#form_msg")
	, kName = $("#name")
	, kMail = $("#xyz")
	, kMessage = $("#msg")
	, selectBoss = $(".selectGlossboss input[name=glossboss]")
	, selectedBoss = {}
	, kInputs = $("#kontakt_inputs")
	, api = "R61bXP70NEnJXC2c__cvgg";


	// Private Function
	function kValidate (el, mail) {
		if(el.value() === "") {
			send.style("visibility", "");
			el.addClass("form__error");
			loader(0);
			appendModal("Unvollständige Angabe: " + el[0].placeholder, 3000, "error");
			return false;
		} else {
			if(mail) {
				var mailtest = /\S+@\S+\.\S+/
				if(!mailtest.test(el.value())) {
					kMail.addClass("form__error");
					appendModal("eMail Adresse ungültig!", 2000, "error");
					send.style("visibility", "");
					loader(0);
					return false;
				}
			}
			return true;
		}
	}
	function kReset() {
		kName.removeClass("form__error");
		kMail.removeClass("form__error");
		kMessage.removeClass("form__error");
		send.style("visibility", "hidden");
		loader(1);
	}
	function kSelectBoss() {
		// allow input
		kInputs.style("opacity", "1");
		send.enable();
		send.removeClass("cursor-not-allowed");

		selectedBoss.Mail = $(".selectGlossboss input[name=glossboss]:checked").value();
		selectedBoss.Name = $(".selectGlossboss input[name=glossboss]:checked")[0].getAttribute("data-boss");
	}
	function kInit() {
		kInputs.style("opacity", ".3");
		send.disable();
		send.addClass("cursor-not-allowed");
		addEvents();
	}
	function kSubmit() {
		kReset();
		var valName = kValidate(kName)
		, valMail = kValidate(kMail, true)
		, valMessage = kValidate(kMessage);
		if(valName && valMail && valMessage) {
			var mailData = {
				"key": api,
				"message": {
					"text": kMessage.value(),
					"subject": "GLOSSBOSS Kontaktanfrage",
					"from_email": kMail.value(),
					"from_name": kName.value(),
					"to": [
					{
						"email": selectedBoss.Mail,
						"name": selectedBoss.Name,
						"type": "to"
					}
					],
					"bcc_address": "ntwcklng@gmail.com",
					"headers": {
						"Reply-To": kMail.value()
					}
				},
				"async": false,
				"ip_pool": "Main Pool"
			};
			ajax({
				method: "POST",
				url: "https://mandrillapp.com/api/1.0/messages/send.json",
				data: mailData,
				useJSON: true,
				success: function(d) {
					loader(1);
					if(d[0].status === "sent") {
						send.style("visibility", "hidden");
						loader(0);
						appendModal("Danke für deine eMail! Wir werden so schnell wie möglich darauf antworten.", 4500);
					}
				}
			});
		}
	}
	function addEvents() {
		send.on("click", function(e){
			e.preventDefault();
			kSubmit();
		}, false);
		selectBoss.on("change", kSelectBoss);
	}

	kInit();
})(window, document);