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
// const letterBank = [];
const gameTime = 60;
let level = 1;

const letterBank = [
    {level: 1,
    letters: "erareus",
    words: ['erasure', 'eraser', 'searer', 'erase', 'rears','reuse', 'rares','reuse','saree','surer']}
]

// const wordLvl1 = "pilafwe".split('');
// const wordsLvl1 = []
// console.log(wordLvl1);

// const worldLvl2 = "linkage".split('');



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

// Get letters
let getLevelLetters = function(level) {
    let levelLetters = letterBank[level - 1].letters.split('');
    return levelLetters;
};

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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

    
    });

};




/*----- initialization -----*/
initialize();
