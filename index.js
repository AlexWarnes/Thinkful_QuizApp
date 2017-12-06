'use strict';

let userAnswers = [];
const answerKey = ['B', 'D', 'C', 'B', 'C'];
// If questions are added, don't forget to add their answers to the answer key!!!

let correct = 0;
let incorrect = 0;

// These variables help navigate the adding and removing 
// of class 'hidden' from question to question
let onQuestion = 1;
let responseCorrect = 'q'+onQuestion+'Correct';
let responseIncorrect = 'q'+onQuestion+'Incorrect';


function updateScoreCard() {
	$('.js-number-correct').text(correct);
	$('.js-number-incorrect').text(incorrect);
}

function launchQuiz() {
	$('.launchQuizButton').click(function(event) {
		event.preventDefault();
		$('.launchQuizPage').addClass('hidden');
		$('.scoreCard').removeClass('hidden');
		$('.q1').removeClass('hidden');
		window.scrollTo(0,0);	
	});
}

function submitAnswer() {
	$('.submitAnswer').on('click', function(event) {
		event.preventDefault();
		  // If the user has not selected a radio input answer, 
		  // this warns the user to select an answer and prevents 
		  // advancing until an answer is selected
			if (!$('input[name=answer]:checked').val()) {
				console.log('If statement running');
				$('.answerWarning').text('Select an answer or the aliens will win!');
				$('fieldset').css('border', '1px solid red');
			} 
		// 	If the user has selected a radio input answer, this puts the 
		// user's answer into the userAnswers array; clears the warning (if applicable); 
		// calls checkAnswer to see if correct or incorrect; calls updateScoreCard to update 
		// user scores; then finally clears the user answer so it doesn't remain selected 
		// while hidden
			else {
				userAnswers.push($('input[name=answer]:checked').val());
				console.log(userAnswers);
				$('.answerWarning').text('');
				$('fieldset').css('border', '1px solid silver');
				checkAnswer();
				updateScoreCard();
				$('input[name=answer]').prop('checked', false);
			}
	});
}

// Here we're comparing the user answer to the respective answerKey value; 
// increments the appropriate correct/incorrect variable; finds and hides the 
// parent question; reveals the appropriate response.
function checkAnswer() {
	if (userAnswers[userAnswers.length-1] === answerKey[userAnswers.length-1]) {
		console.log('correct');
		console.log(onQuestion);
		correct++;
		$('.q'+onQuestion).addClass('hidden');
		$('.'+responseCorrect).removeClass('hidden');
	} else {
		console.log('incorrect');
		incorrect++;
		$('.q'+onQuestion).addClass('hidden');
		$('.'+responseIncorrect).removeClass('hidden');
	}
}

// After clicking the nextQuestion button, this increments the onQuestion 
// variable; updates the text in the scoreCard to the appropriate question; 
// updates the responseCorrect/responseIncorrect variables to allow for the 
// appropriate responses to show after the next question runs a checkAnswer 
// function; then hides whatever response is showing, and reveals whatever 
// the next question is; we move the view back to top in case someone has scrolled down.
function nextQuestion() {
	$('.nextQuestion').on('click', function(event) {
		event.preventDefault();
		onQuestion++;
		responseCorrect = 'q'+onQuestion+'Correct';
		responseIncorrect = 'q'+onQuestion+'Incorrect';
		$('.questionCount').text(onQuestion);
		$('.response').addClass('hidden');
		$('.q'+onQuestion).removeClass('hidden');
		window.scrollTo(0,0);
		
		// Finally if the user hits the button on the last question, 
		// this brings them to the results page; creates their grade as a percentage
		if (onQuestion === answerKey.length + 1) {
			let grade = (correct / 5 * 100) + '%';
			$('.scoreCard').addClass('hidden');
			$('.grade').text(grade);
			}
	});
}

//When the user clicks the retake button, we reset all the 
// variables correct, incorrect, onQuestion, and reset the scoreCard 
// to reflect that; then we hide the results page and reveal the 
// launchQuizPage to start over; and finally auto scroll back to the top!
function retakeQuiz() {
	$('.retake').on('click', function(event) {
		event.preventDefault();
		correct = 0;
		incorrect = 0;
		onQuestion = 1;
		userAnswers = [];
		responseCorrect = 'q'+onQuestion+'Correct';
		responseIncorrect = 'q'+onQuestion+'Incorrect';
		updateScoreCard();
		$('.questionCount').text(onQuestion);
		$('.resultsPage').addClass('hidden');
		$('.launchQuizPage').removeClass('hidden');
		window.scrollTo(0,0);
	});
}


function startGame() {
	launchQuiz();
	submitAnswer();
	nextQuestion();
	retakeQuiz();
}

$(startGame);