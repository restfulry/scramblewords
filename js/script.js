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

const gameTime = 60;
let level = 1;

const letterBank = [
    {level: 1,
        letters: "erareus",
        words: ['erasure', 'eraser', 'searer', 'erase', 'rears','reuse', 'rares','reuse','saree','surer']}
    ]
    


/*----- cached element references -----*/



/*----- event listeners -----*/
//  Wait for user to click start
// Once clicked, wait for user to type on keyboard
$('#guesses').keypress(function(e) {
    const userChoice = e.key.toUpperCase();
    // CHECK IF LETTER TYPED HAS ALREADY BEEN "USED" FROM BANK

})

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

//  Get letters for bank
let lettersInBank = getLevelLetters(level);

//  Shuffle letters
    shuffleArray(lettersInBank);

//  Press Start
    $('#start-game').click(function(e) {
        // Start timer countdown

        // Populate letter bank

        // Create guesses forms
        let levelWords = getLevelWords(level);
        console.log('levelWords', levelWords);
        
        // let levelWordsShuffled = shuffleArray(levelWords);
        // console.log(levelWordsShuffled);


        // while - choose random index six times
        // return array of six words from levelWords
        // push to new array if != previous word/index

        // RENDER GUESSES FORMS
        // Grab first 6 words
        for (i = 0; i < 6; i++) {
            // create six "guesses-form"
            let currentWord = levelWords[i];
            console.log(currentWord.length);
            // turn current word string into an array
            // create an array of inputs for each letter
            // joiin the array of all the inputs into one string
            const $newGuessForm = $(`
                <br>    
                <div class="input-group" id="guesses-form">
                <div class="input-group-prepend">
                <span class="input-group-text">Word ${i+1}</span>
                </div>
                ${
                    currentWord.split('').map(function(letter){
                        return `<input type="text" aria-label="letter ${i+1}" class="form-control">`
                    }).join(' ')
                }
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

        
    });

};




/*----- initialization -----*/
initialize();
