var _m = {
	Input1 : $("#mischungInput1"), //1:
	Input2 : $("#mischungInput2"), //4
	Input3 : $("input:radio[name='flaschengroesse']"), //Flaschengröße
	Result : $("#mischungResult"),
	Resultml: $(".mischung--highlight"),
	result1 : "0",
	result2 : "0",
	validateNum: function(Num) {
		var pattern = /^\d+$/;
		return pattern.test(Num);
	},
	update: function() {
		input1Val     = this.Input1.val();
		input2Val     = this.Input2.val();
		input3Val     = $("input:radio[name='flaschengroesse']:checked").val();
		
		if(input1Val && input2Val && input3Val) {
			//Gesamtanzahl der teile einer Mischung. 1:4 -> 5
			Gesamt        = parseInt(input1Val) + parseInt(input2Val);
			Step          = input3Val / Gesamt;
			
			//Einzelne Teile berechnen und aufrunden auf 2 Kommastellen
			result1       = Math.round(Step*input1Val).toFixed(2);
			result2       = Math.round(Step*input2Val).toFixed(2);
			
			//entfernen der letzten 3 Zeichen (.nn)
			result1Finish = result1.slice(0,result1.length-3);
			result2Finish = result2.slice(0,result2.length-3);

			//Wenn alle 3 Angaben gemacht wurden, wird der Hauptcontainer angezeigt
			//danach wird das Ergebnis ausgblendet und beim beenden der neue Text in das div geladen
			this.Result.show();
			this.Resultml.fadeOut('fast', function() {
				$(this).text(result1Finish + "ml:" + result2Finish + "ml");
			});
			this.Resultml.fadeIn('fast');
			//Zum Hauptcontainer scrollen
			$('html, body').animate({ scrollTop: ($(this.Input1).offset().top-38)}, '700');
		}
	}
}
_m.Input1.on('change', function(){
	_m.update();
});
_m.Input2.on('change', function(){
	_m.update();
});
_m.Input3.on('change', function(){
	_m.update();
});

