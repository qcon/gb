(function mischungsrechner(w, d) {
	var part1 = $("#mischungInput1")[0]
	, part2 = $("#mischungInput2")[0]
	, predefinedValues = {}
	, result = $("#mischungResult")
	, resultMl = $("#mischung--highlight")
	, output = ""
	, mischungInputs = $("#mischungsrechner input")
	, header = $("#mischung--heading")
	, predefinedDil = $(".mischungenpredefined");

	var calculateDil = function() {
		var allParts, step, res1, res2, res1Finish, res2Finish, cResult, bottleValue;
		bottleValue = getBottleValue();
		cPart1 = part1.value;
		cPart2 = part2.value;

		allParts = parseInt(cPart1) + parseInt(cPart2);
		step = parseInt(bottleValue) / allParts;

		res1 = Math.round(step * cPart1).toFixed(2);
		res2 = Math.round(step * cPart2).toFixed(2);

		res1Finish = res1.slice(0, res1.length - 3);
		res2Finish = res2.slice(0, res2.length - 3);
		output = "" + res1Finish + "ml:" + res2Finish + "ml";
		return output;
	};
	var updateOutput = function(output) {
		result.style("display", "block");
		resultMl.text(output);
	};
	var getBottleValue = function() {
		var bottleValue = $('input[type="radio"]:checked')[0].value || 0;
		if(bottleValue > 0) {
			return bottleValue;
		} else {
			return 0;
		}
	};
	var shouldOutput = function(force) {
		var bottleValue = getBottleValue();
		if(part1.value > 0 && part2.value > 0 && bottleValue > 0) {
			return true;
		} else {
			return false;
		}
	};
	var updateEvent = function() {
		var canIUpdateplz = shouldOutput();
		if(canIUpdateplz) {
			updateOutput(calculateDil());
		}
	};
	var addEvents = (function() {
		predefinedDil.on("click", function() {
			var content = this.innerHTML.split(":");
			predefinedValues = {
				part1: content[0],
				part2: content[1]
			}

			// set the 2 input values to the predefined ones
			part1.value = predefinedValues.part1;
			part2.value = predefinedValues.part2;
			
			updateEvent();
		});
		mischungInputs.on("change", updateEvent);
		mischungInputs.on("paste", updateEvent);
	})();
})(window, document)