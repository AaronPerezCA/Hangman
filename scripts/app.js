// Have an array of different words - data.json
// Make a counter variable to count the number of remaining turns/turns taken
// Variable for maximum number of turns that can be taken
// Random generator or function to grab a word from our array
// Create a number of underscores equal to the length of our random word
// Keep a letter bank, to show which letters the user has already tried
// Counter for correct guesses, so that we know if they've won the game
// Input field for user
// Start and Restart button
// Display field for remaining/used turns
// Loop to display the letters in their correct positions when the user guesses a letter correctly

//Index.html Elements
let startBtn = document.getElementById('startBtn');
let restartBtn = document.getElementById('restartBtn');
let userInput = document.getElementById('userInput');
let displayedWord = document.getElementById('displayedWord');
let displayedGuesses = document.getElementById('displayedGuesses');
let letterBank = document.getElementById('letterBank');

// will become the random word we pull from our array
let randomWord = "";

// this will contain an array that we will join together later
// in order to display the underscores and letters they have guessed correctly,
// in the spaces they would take up in a word
let letterArray = [];

// this will be the letters they have guessed
let wrongGuess = "";

//number of guesses they have made, or turns taken, starts at zero
let guesses = 0;

let maxGuesses = 6;

//click event function to call data call 
startBtn.addEventListener('click', function(){
    dataCall();
})

//restart button calling restart function (EventListener)
restartBtn.addEventListener('click', function(){
    resetGame();
})

//key down/ pressing a key down, saves the value key user Inputs (Event Listener) 
userInput.addEventListener("keydown", function(event) {
    // event or "e" is a reserved word which will run the function event and also stores the data from the function   its like a fishing net and grabs a bunch of data unlike us making a variable normally
    // console.log(event);
    // event looking for Enter Key specifically
    if(event.key === "Enter"){
        let guess = userInput.value.toLowerCase();
        //Check if the users guess is included in our random word
        if(randomWord.includes(guess)){
            // alert("test");
            for(let i = 0; i < randomWord.length; i++){
                if(randomWord[i] === guess){
                    letterArray[i] = guess;
                }
            }
        }else{
            wrongGuess += guess;
            letterBank.textContent = wrongGuess;
            guesses++;
        }
        updateGameState();
        userInput.value = "";
        gameEnd();
    }
})
//function to get random word 
function dataCall() {
    //fetch information in json data file, taking in as parameter, declaring json format
    fetch('./data/data.json').then(response => response.json()).then( data => {
//random whole number/ word
        let rndNum = Math.floor(Math.random() * data.words.length);
        randomWord = data.words[rndNum];
        // console.log(randomWord);
//function to start game and pass random word into it
        startGame(randomWord);
    })
}

//start game function, allow user to type in box 
function startGame(word){
letterArray = [];
//for loop
for(let i = 0; i < word.length; i++){
    letterArray[i] = "_";
    //call function update appearance
    updateGameState();
    //allow user to input .notation conversation w/html
    userInput.readOnly = false;
}
}

//plays audio on startBtn button click
function play1() {
    let audio = document.getElementById("startaudio");
    audio.play();
  }
//plays audio on restartBtn button click
function play2() {
    let audio2 = document.getElementById("restartaudio");
    audio2.play();
  }

//declare update game state function
function updateGameState(){
    //space in quotation marks for readability
    displayedWord.textContent = letterArray.join(" ");
    //backtick for interpulation, keeping guesses used, call max guesses
    displayedGuesses.textContent = `Guesses Used: ${guesses} / ${maxGuesses}`;
}

//reset game/ all varibles declared function to get new word, guesses back to 0
function resetGame(){
    randomWord = "";
    wrongGuess = "" ;
    letterArray = [];
    guesses = 0;
    //disables box so user cannot type in it
    userInput.readOnly = true;
    userInput.value = "";
    displayedGuesses.textContent = "Guesses Used: X / X";
    displayedWord.textContent = "Displayed Word";
    letterBank.textContent = "Letter Bank";
}


function gameEnd(){
    // Lose: check if guesses === maxGuesses
    // Win: check if randomWord === letterArray
    if(guesses === maxGuesses){
        alert(`You lose! Your word was ${randomWord}`);
        resetGame();
    }else if(letterArray.join("") === randomWord && randomWord != ""){
        alert(`You win! Your word was ${randomWord}`);
        resetGame();
    }
}




