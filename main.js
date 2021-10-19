window.addEventListener('load', init);

// Global Variables

// Available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};

// to change levels
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = ['hat','chat','river','generate','words','joke','runaway','cocktail','developer','nutrition','siblings','investigation','laughter','establishment','echo','master','github','stalwart','definition','hero','actress','computer','hello','mobile','turn','sky','random','india','history','peacock'];

// initialize game
function init(){
    // show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // call countdown every second
    setInterval(countdown, 1000);
    // check game status
    setInterval(checkStatus, 50);
}

// Start Match
function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1; // To save the extra 1s time wasted during page loading
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // Highscore based on score value for Session Storage
    if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
        sessionStorage['highscore'] = score;
    } else {
        sessionStorage['highscore'] = sessionStorage['highscore'];
    }

    // Prevent display of High Score: -1
    if (sessionStorage['highscore'] >= 0) {
        highscoreDisplay.innerHTML = sessionStorage['highscore'];
    }

    // if score is -1 then display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }
    else{
        scoreDisplay.innerHTML = score;
    }
}

//  Match currentWord to wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!!!';
        return true;
    }
    else{
        message.innerHTML = '';
        return false;
    }
}

// pick & show random word
function showWord(words){
    // generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // output random word
    currentWord.innerHTML = words[randIndex];
}

// countdown timer
function countdown(){
    // check if time is not run out
    if(time > 0){
        // decrement time
        time--;
    }
    else if(time === 0){
        // Game is over
        isPlaying = false;
    }
    // show time
    timeDisplay.innerHTML = time;
}

// check game status
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}