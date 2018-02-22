var inquirer = require("inquirer");
var word = require("./word.js");

var wordChoices = ["sacramento", "indianapolis", "tallahassee", "denver", "honolulu", "augusta", "boston", "austin", "nashville", "atlanta"];
var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var randomWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];

var guessedLetters = [];
var guessed = [];

var round = 0;
var winCount = 0;
var lossCount = 0;
var counter = 0;

var guessesRemaining = 10;
var correctLetters = 0;

var roundWord = new word();
roundWord.genWord(randomWord);

function playGame() {

	var guess = true;

	if (counter == 0) {
		roundWord.showWord();
		counter++;
	}

	inquirer.prompt([

			{
				type: "input",
				message: "Guess a Letter:",
				name: "letter"
			}

		]).then(function(result) {
			var userLetterGuess = true;

			for (var i = 0; i < lettersArray.length; i++) {
				if (lettersArray[i] === result.letter) {
					userLetterGuess = false;
				}
			}

			if (result.letter.length > 1 || userLetterGuess) {
				console.log("Please enter a valid letter!");
				playGame();
			}

			else {

				if (guessed.length > 0) {
					console.log("Guessed so far: " + guessedLetters.join(", "))
				}

				for (var j = 0; j < guessed.length; j++) {
					if (guessedLetters[j] === result.letter || guessed[j] === result.letter) {
						guess = true;
					}
				}

				if (guess) {
					roundWord.letterGuess(result.letter);
					roundWord.showWord();

					if (roundWord.test) {
						console.log("Correct!");
						console.log("Remaining Guesses: " + guessesRemaining);
						guessed.push(result.letter);
					}

					else {
						guessesRemaining--;

						console.log("Wrong!");
						console.log("Remaining Guesses: " + guessesRemaining);
						guessedLetters.push(result.letter);

					}

					if (guessesRemaining > 0 && roundWord.gameOver) {
						playGame();
					}

					else if (guessesRemaining < 1) {
						Losser();
					}

					else {
						Winner();
					}
				}

				else {
					roundWord.showWord();

					console.log("That letter has already been guessed... try again!");

					playGame();
				}
			}
		})
}

function Winner() {

	winCount++;
	round++;

	if (lossCount > 0) {
		console.log("Losses: " + lossCount);
	}

	console.log("Wins: " + winCount);
	console.log("Round: " + round);
	console.log("You WIN! Game Over.");

	inquirer.prompt([

			{
				type: "confirm",
				message: "Play again?",
				name: "anotherRound"
			}

		]).then(function(result) {
			if (result.anotherRound === true) {
				reset();
				playGame();
			}
		})
}

function Losser() {

	lossCount++;
	round++;

	if (winCount > 0) {
		console.log("Wins: " + winCount);
	}

	console.log("Losses: " + lossCount);
	console.log("Round: " + round);
	console.log("You lost. Game Over.");

	inquirer.prompt([

			{
				type: "confirm",
				message: "Play again?",
				name: "anotherRound"
			}

		]).then(function(result) {
			if (result.anotherRound === true) {
				reset();
				playGame();
			}
		})
}

function reset() {
	guessesRemaining = 10;

	counter = 0;

	guessedLetters = [];

	guessed = [];

	randomWord = wordChoices[Math.floor(Math.random() * randomWord.length)];

	roundWord.genWord(randomWord);

	roundWord.gameOver = true;
}





playGame();