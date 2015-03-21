var teil1         = _("#mischungInput1"),
teil2             = _("#mischungInput2"),
ergebnis          = _("#mischungResult"),
ergebnisML        = _("#mischung--highlight"),
getMischungInputs = _("#mischungsrechner input"),
header            = _("#mischung--heading");

updateMischung = function() {
	flascheVal = _('input[type="radio"]:checked');

	if( teil1.value && teil2.value && flascheVal.value ) {

		if(ergebnis.style.display !== 'block') jumpTo( header );

		gesamt        = parseInt(teil1.value) + parseInt(teil2.value);
		step          = flascheVal.value / gesamt;
		
		result1       = Math.round(step*teil1.value).toFixed(2);
		result2       = Math.round(step*teil2.value).toFixed(2);
		
		result1Finish = result1.slice(0,result1.length-3);
		result2Finish = result2.slice(0,result2.length-3);

		ergebnis.style.display = 'block';
		ergebnis.style.background = '#49fb35';
		
		setTimeout(function() {

			ergebnis.addClass("mischungsDelay");
		 	ergebnis.style.background = '#fff';

		 },100);
		ergebnisML.innerHTML = result1Finish + "ml:" + result2Finish + "ml";

	}

};

if(getMischungInputs) {

	getMischungInputs.forEach(function(el) {

		el.addEventListener('change', function() {

			ergebnis.removeClass("mischungsDelay");
			updateMischung();

		});
	});
}

