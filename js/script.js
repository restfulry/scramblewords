/*----- app's state (variables) -----*/
let gameTime = 180000;
let level = 0;

let words = '';
let guessedWord = '';
let userKeyInputs = [];
let userGuesses = [];
let numCorrectWords = 0;

let levelWords = [];
let lettersInBank;

const letterBank = [
    {   level: 1,
        letters: "erareus",
        words: ['erasure', 'eraser', 'searer', 'erase', 'rears','reuse', 'rares','saree','surer', 'erases']},
    {   level: 2,
        letters: "powder",
        words: ['powder', 'doper', 'dower', 'pored', 'power','roped', 'rowed']},
    {   level: 3,
        letters: "clswoer",
        words: ['scowler', 'ceorls', 'closer', 'cowers', 'cresol','escrow', 'lowers','slower','close','cores', 'corse', 'cower','cowls','crews','loser','lower','crows','roles','score','scowl','screw','sorel','sower','swore','worse']},
    {   level: 4,
        letters: "yrednaw",
        words: ['wander', 'warden', 'warned', 'yarned', 'yawned','yawner', 'awned','deary','deray','drawn', 'nerdy', 'rayed','ready','wader','waned','wared','weary','yawed','yearn']},
    {   level: 5,
        letters: "abridge",
        words: ['abridge', 'brigade', 'abider', 'badger', 'barged','bridge', 'garbed','abide','aider','aired', 'badge', 'bared','barge','beard','braid','bread','bride','debag','dirge','gibed','grade','rabid','raged','rebid','ridge']},
    {   level: 6,
        letters: "delator",
        words: ['leotard', 'loader', 'orated', 'ordeal', 'reload','retold', 'adore','alder','alert','alter', 'dater', 'dealt','delta','derat','dotal','lader','doter','lated','later','oared','oater','older','orate','rated','tared','trade','tread']},
    {   level: 7,
        letters: "rdiigns",
        words: ['ridings', 'grinds', 'indris', 'riding', 'rising','siding', 'siring','dings','girds','grids', 'grind', 'grins','rigid','rinds','rings']},
    {   level: 8,
        letters: "rotauqe",
        words: ['equator', 'oater', 'quoter', 'orate', 'torque','outer', 'quart','quate','quart','quota', 'quote', 'route','toque']},
    {   level: 9,
        letters: "sretarg",
        words: ['graters', 'garters', 'arrest', 'garter', 'gaters','grater', 'grates','greats','rarest','raster', 'raters', 'raters','retags','stager']},
    {   level: 10,
        letters: "namsrao",
        words: ['oarsman', 'aromas', 'manors', 'ransom', 'aroma','arson', 'manor','manos','mason','moans', 'moras', 'norms','roams','sonar']}         
    ]
    
// Timer
let timerRunning = false;
let currentTimer = 0;
let runTimer;




/*----- cached element references -----*/
let $time = $('.card > .card-body > .card-title > #clock');
let winMsg = $(`<div class="win-msg text-center">YOU WIN</div>`);
let loseMsg = $(`<div class="lose-msg text-center">YOU LOSE :(</div>`);



/*----- functions -----*/
// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Get letters
function getLevelLetters(level) {
    let levelLetters = letterBank[level - 1].letters.split('');
    return levelLetters;
};

// Get words
function getLevelWords(level) {
    return letterBank[level - 1].words;
};

function renderInitialUi() {
    const $guesses = $(`<div class="card-title">Guesses</div>`);
    const $timeRemaining = $(`<h4 class="text-center">Time Remaining</h4>`);
    const $letterBank = $(`<h4 class="text-center">Letter Bank</h4>`);

    $('.card-group > .card > #guesses').append($guesses);
    $('.card-group > .card > #right-panel > .clock').append($timeRemaining);
    $time.html('00');
    $('.card-group > .card > #right-panel > #letter-bank').append($letterBank);
    $('.card-group > .card > #right-panel > #letter-bank').css('background-color', '#e3bac6');
    $('.card-group > .card > #right-panel > .clock').css('background-color', '#edeec0');
    $('.card-group > .card > #guesses').css('background-color', '#bc9ec1');
}

function renderGuessForms(){
    for (i = 0; i < 6; i++) {
     let randomIndex = Math.floor(Math.random() * levelWords.length);
     let currentWord = levelWords[randomIndex];
     const $newGuessForm = $(`
         <br>    
         <div class="input-group guesses-form" id="guesses-form-${i+1}">
         <div class="input-group-prepend">
         <span class="input-group-text">Word ${i+1}</span>
         </div>
         <div class="input-group letters">
         ${
             currentWord.split('').map(function(letter, idx){
                 return `<input type="text" aria-label="letter-${idx+1}" class="form-control ${idx+1}" maxlength="1">`
             }).join(' ')
         }
         </div>
         <button type="button" class="btn btn-warning">Submit Word</button>
         <br>
     `)
     $('.card-group > .card > #guesses').append($newGuessForm);
 }
};

function renderLevelLetters(){
    lettersInBank.forEach(function(letter) {
        let $letterToDisplay = (`
            <div class="letter">${letter.toUpperCase()}</div>
        `)
        $('.card > .card-body > #letter-bank').append($letterToDisplay);
    });
};

function checkCorrectWord() {
    return levelWords.includes(guessedWord);
};

function wordNotAlreadyGuessed() {
    return !userGuesses.includes(guessedWord);
};

function allLettersFilled(guess){
        return guess.length === guessedWord.length;
}; 

function joinLetters($guessedLetters) {
    $guessedLetters.each(function() {
        guessedWord += this.value;
    });
};

function checkForValidInput(userChoice) {
    if(lettersInBank.includes(userChoice)){
        return true;
    } else if(userKeyInputs.includes(userChoice)) {
        return false;
    } else {
        return false;
    }
};

function startBtnToNewGameBtn(){
    $('#start-game').prop('disabled', true);
    $('#start-game').removeClass("btn-success");
    $('#start-game').addClass("btn-danger");
};

function newGameBtnToStartBtn(){
    $('#start-game').removeClass("btn-danger");
    $('#start-game').addClass("btn-success");
    $('#start-game').html('New Game');
    $('#start-game').prop('disabled', false);
}

function disableStartBtn() {
    $('#start-game').prop('disabled', true);
};

function initializeTimer() {
    timerRunning = false;
    gameTime;
    currentTimer = gameTime/1000;
    runTimer;
    $time.html(`${currentTimer}`);
};

function outOfTime(){
    const $btnNewGame = $(`
        <div class="col-sm">
            <button type="button" class="btn btn-danger" id="new-game">New Game</button>
        </div>
    `);
    $('#guesses :input').prop('disabled', true);
    $time.html('TIME OUT');
    newGameBtnToStartBtn();
};

function startTimer() {
    if(!timerRunning){
        timerRunning = true;
        runTimer = setInterval(() => {
            $time.html(currentTimer--);
        }, 1000);
    }
};

function stopTimer() {
    if(timerRunning){
        clearInterval(runTimer);
        timerRunning = false;
    }
};

function renderLoseMsg() {
    loseMsg.insertAfter($('.jumbotron'));
}

function loseLevel() {
    stopTimer();
    outOfTime();
    renderLoseMsg();
}

function checkWin(){
    if(numCorrectWords === 6) {
        winLevel();
    }
};

function renderWinMsg() {
    winMsg.insertAfter($('.jumbotron'));
}

function winLevel() {
    stopTimer();
    newGameBtnToStartBtn();
    renderWinMsg();
};

function resetUiInputs() {
    $('.card > .card-body > #letter-bank').empty();
    $('.card-group > .card > #guesses').empty();
    $('#guesses :input').prop('disabled', false);
    $('h4').remove();
    winMsg.remove();
    loseMsg.remove();
};

/*----- initialization -----*/
function initialize() {
    level += 1;
    words = '';
    userKeyInputs = [];
    guessedWord = '';
    userGuesses = [];
    numCorrectWords = 0;
    timerRunning = false;
    lettersInBank = getLevelLetters(level);
    levelWords = getLevelWords(level);

    initializeTimer();
    resetUiInputs();
    shuffleArray(lettersInBank);
};

/*----- event listeners -----*/

//  PRESS START
$('#start-game').click(function(e) {
    initialize();
    setTimeout(loseLevel, gameTime);
    startTimer();
    renderInitialUi();
    startBtnToNewGameBtn();
    renderGuessForms();
    renderLevelLetters();
    
    // User input on keyboard
    $('#guesses').keypress(function(e){
        const userChoice = e.key.toLowerCase();
        const userInput = e.target
        if(checkForValidInput(userChoice)){
            $(userInput).next().focus();
            userKeyInputs.push(userChoice);
            return userKeyInputs;
        } else {
            e.preventDefault();
        };
    });
    
    let $btnSubmitWord = $('#guesses > .guesses-form > button');
    
    // SUBMIT WORD
    $btnSubmitWord.click(function(e) {
        let $guessedLetters = $(this).siblings('.letters').children();
        joinLetters($guessedLetters);
        
        let wordIsValid = Boolean(checkCorrectWord() && wordNotAlreadyGuessed() && allLettersFilled($guessedLetters));

        if(wordIsValid){
            $(this).css("background-color", "#90ee90");
            $(this).prop('disabled', true);
            $guessedLetters.prop('disabled', true);
            $guessedLetters.css("background-color", "#90ee90");
            userGuesses.push(guessedWord);
            guessedWord = '';
            numCorrectWords += 1;
        } else {
            $guessedLetters.css("background-color", "#ffa07a");
            guessedWord = '';
        }

        checkWin();
    });
});
