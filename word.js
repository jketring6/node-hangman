var Letter = require("./letter.js");

var wordGuess = "";

function word() {

	this.wordArray = [];
	this.gameOver = true;
	this.test = false;

	this.genWord = function(wordLoop) {

		this.wordArray = [];
		for (var i = 0; i < wordLoop.length; i++) {
			var pushedWord = new Letter(wordLoop[i]);
			this.wordArray.push(pushedWord);
		}
	};

	this.showWord = function() {

		var shownArray = [];
		var counter = 0;

		for (var j = 0; j < this.wordArray.length; j++) {

			var showLetter = this.wordArray[j].guessText();

			if (showLetter === "_") {
				counter++;
			}

			shownArray.push(showLetter);
			
		}

		console.log (shownArray.join(" "));

		if (counter === 0) {
			this.gameOver = false;
		}
	}

	this.letterGuess = function(letter) {

		 var counter = 0;

		for (var z = 0; z < this.wordArray.length; z++) {

			this.wordArray[z].checkGuess(letter);

			if (this.wordArray[z].correct) {
				counter++;
			}
		}

		if (counter > 0) {
			this.test = true;
		}

		else {
			this.test = false;
		}
	}
}


module.exports = word;