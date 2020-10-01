/* Flow

Wait for user to click start
Initialize
    Letter bank populates, empty word guess boxes appear, timer starts counting down
User clicks guess box
Useer types word guess
    If guess === word from word bank, one correct
    If guess !== word from word bank
        error msg
        clear guess in box
If timer ends before all correct guesses, no more guesses allowed
    Show lose msg
    Show next level btn
    Wait for user to click next level
        Re initialize
If user guesses all words
    Show win msg
    Show next level btn
    Wait for user to click next level
        Re-initialize
*/


/*----- app's state (variables) -----*/
const words = '';
const userGuesses = [];
let guessedWord = '';

const gameTime = 60;
let level;

// const alphabet = "abcdefghijklmnopqrstuvwxyv".toUpperCase().split('');

const letterBank = [
    {level: 1,
        letters: "erareus",
        words: ['erasure', 'eraser', 'searer', 'erase', 'rears','reuse', 'rares','reuse','saree','surer']}
    ]
    
let lettersInBank;

/*----- cached element references -----*/



/*----- event listeners -----*/
//  Wait for user to click start


/*----- functions -----*/

/* to INITIALIZE:
-   choose level letters
-   populate letter bank
-   create guesses forms

-   after win/loss is met
-   show next level button
-   choose level letters
-   populate letter bank
-   create guesses form
*/

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Get letters
let getLevelLetters = function(level) {
    let levelLetters = letterBank[level - 1].letters.split('');
    return levelLetters;
};

// Get words
    // - shuffle word array
    // - choose first six words in shuffled array
let getLevelWords = function(level) {
    return letterBank[level - 1].words;
};

// Initialize
const initialize = function() {
    level = 1;
//  Get letters for bank, shuffle, and return
    lettersInBank = getLevelLetters(level);
    shuffleArray(lettersInBank);
    return lettersInBank;
};

//  Press Start
$('#start-game').click(function(e) {
    // Start timer countdown

    let levelWords = getLevelWords(level);
    
    let levelWordsShuffled = shuffleArray(levelWords);


    // while - choose random index six times
    // return array of six words from levelWords
    // push to new array if != previous word/index

    // RENDER GUESSES
    // Grab first 6 words
    for (i = 0; i < 6; i++) {
        // create six "guesses-form"
        let currentWord = levelWords[i];
        // turn current word string into an array
        // create an array of inputs for each letter
        // joiin the array of all the inputs into one string
        const $newGuessForm = $(`
            <br>    
            <div class="input-group" id="guesses-form-${i+1}">
            <div class="input-group-prepend">
            <span class="input-group-text">Word ${i+1}</span>
            </div>
            <div class="input-group letters">
            ${
                currentWord.split('').map(function(letter){
                    return `<input type="text" aria-label="letter ${i+1}" class="form-control ${i+1}" maxlength="1">`
                }).join(' ')
            }
            </div>
            <button type="button" class="btn btn-warning">Submit Word</button>
            <br>
        `)
        $('.card-group > .card > #guesses').append($newGuessForm);
    }

    // display level letters
    lettersInBank.forEach(function(letter) {
        let $letterToDisplay = (`
            <div class="letter">${letter.toUpperCase()}</div>
        `)
        $('.card > .card-body > #letter-bank').append($letterToDisplay);
    });


    // Check for valid input
    const checkForValidInput = function(userChoice) {
        if(lettersInBank.includes(userChoice)){
            return true;
        } else if(userGuesses.includes(userChoice)) {
            return false;
        } else {
            return false;
        }
    };
    
    // User input on keyboard
    $('#guesses').keypress(function(e){
        const userChoice = e.key.toLowerCase();
        if(!checkForValidInput(userChoice)){
            e.preventDefault();
        };
        userGuesses.push(userChoice);
        return userGuesses;
    });
    // WIN CONDITIONS
    let $guessedLetter = $('#guesses > #guesses-form-1 > .letters > input');
    let $btnSubmitWord = $('#guesses > #guesses-form-1 > button');
    
    
    //JOIN USER INPUT LETTERS INTO WORD STRING
    const joinLetters = function() {
        $guessedLetter.each(function() {
            guessedWord += this.value;
            return guessedWord;
        })
    };
    
    // SUBMIT WORD BUTTON
    $btnSubmitWord.click(function(e) {
        joinLetters();
        checkCorrectWord();
    });
    
    // CHECK IF WORD IS CORRECT
    const checkCorrectWord = function() {
        levelWords.find(function(word) {
            if(word === guessedWord){
                console.log('hooray');
                $guessedLetter.prop('disabled', true);
                $guessedLetter.css("background-color", "green");
            } else {
                console.log('try again')
            }
        });
    };
    
});


// function nextLevel() {
//     .value = ''
//      level = level++;
// }



/*----- initialization -----*/
initialize();
