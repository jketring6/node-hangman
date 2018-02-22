function Letter(letter) {

	this.letter = letter;
	this.guess = false;
	this.correct = false;

	this.guessText = function() {

		if (this.letter == " ") {
			this.guess = true;
			return this.letter;
		}

		if (this.guess) {
			return this.letter;
		}

		else {
			return "_"
		}
	};

	this.checkGuess = function(userInput) {
		this.correct = false;
		if (userInput == this.letter) {
			this.guess = true;
			this.correct = true;
		}
	}
}

module.exports = Letter;