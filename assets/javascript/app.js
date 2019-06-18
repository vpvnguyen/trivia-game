$(document).ready(function () {

    // Functions
    // Initialization Function; display game title and start button
    var createStart = function () {
        console.log('createStart()');
        $('#triviaGame').append(`<h1 class='display-2'>Trivia Game`); // title
        $('#triviaGame').append(`<button id='start' class='btn btn-primary btn-lg'>Start`); // start button
    };

    // Timer Function; run count() every second
    var countSec = function () {
        timerRunning = true; // set that timer is running
        intervalSec = setInterval(count, 1000); // for every second, run count
    };

    // count function; start timer running down; check if timer is 0
    var count = function () {
        secondsLeft--; //lose a count

        $('#countDown').text(`00:0` + secondsLeft); // show timer left

        if (secondsLeft === 0 && questionBool === true) { // if time is out and game/round is live
            timerRunning = false; // declare that timer is stopped
            clearInterval(intervalSec); // clear the interval that was ran
            nextPage(); // advance next round
            console.log('timeoutpage');
        } else if (secondsLeft === 0 && questionBool === false) { // if time is out and game / round is not live
            timerRunning = false; // declare that timer is stopped
            clearInterval(intervalSec); // clear the interval that was ran
            questionPage(); // advance to question page
            console.log('next question');
        }
    };

    // hide title; declare that this is the question page; display time left; loop through object and display each question pack
    // each time this function runs, increment to next question
    var questionPage = function () {
        $('#triviaGame').empty(); // clear content
        questionBool = true; // declare round is live
        secondsLeft = 10; // set time interval to 10 seconds
        $('#triviaGame').append(`<div id='countDown' class='display-2'>00:10`); // show timer

        // loop through object of questions and display possible options
        for (var i = 0; i < Object.values(questionObj[questionNum])[2].length; i++) {
            console.log(`Length: ${Object.values(questionObj[questionNum])[2].length}`);
            console.log(`Question: ${Object.values(questionObj[questionNum])[2][i]}`);
            $('#triviaGame').append(`<button id='poss${i}' class='btn btn-primary btn-lg'>${Object.values(questionObj[questionNum])[2][i]}`);
        }

        // increment to next question each time this function is ran
        questionNum++;

        // restart timer and check which round to advance
        countSec();
    };

    // interval page between questions / wait time
    var nextPage = function () {
        $('#triviaGame').empty(); // clear out content
        questionBool = false; // declare that round isnt running
        secondsLeft = 3; // set interval to 3 secs to run on this page
        $('#triviaGame').append(`<div id='countDown' class='display-2'>00:03`); // display 3 second timer

        // restart timer and check which round to advance
        countSec();
    };

    // Global Variables
    var intervalSec; // set interval to count
    var secondsLeft; // timer on clock
    var timerRunning = false; // is timer running; figure out why timer is running is needed
    var questionBool = false; // is round / game running
    var questionNum = 0; // index to check questions

    // Questions and Answers
    var questionObj = [
        {
            question: 'Question 1',
            answer: 'Answer 1',
            possible: ['Answer 1', 'Answer 2', 'Answer 3']
        },
        {
            question: 'Question 2',
            answer: 'Answer 1',
            possible: ['Answer 4', 'Answer 5', 'Answer 6']
        },
        {
            question: 'Question 3',
            answer: 'Answer 1',
            possible: ['Answer 7', 'Answer 8', 'Answer 9']
        }
    ];

    // testing looping through array of objects and outputting string
    for (var i = 0; i < questionObj.length; i++) {
        console.log(questionObj[i]);
        console.log(Object.values(questionObj[i])[0]);
        console.log(Object.values(questionObj[i])[2][0]);
    }

    if (Object.values(questionObj[0])[1] === Object.values(questionObj[0])[2][0]) {
        console.log('True');
    }

    // Initialation
    createStart();
    $('#start').on('click', function () {
        questionPage();
        // When User Clicks Button
    });
});