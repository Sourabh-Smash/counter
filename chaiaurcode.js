let randomNumber = Math.floor(Math.random() * 100 + 1);
// console.log(randomNumber);

const userInput = document.querySelector('#guessField');
const submitBtn = document.querySelector('#subt');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');
let prevGusses = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    })
}
const validateGuess = guess => {
    if (isNaN(guess)) {
        alert(`Enter a valid Number`);
    } else if (guess > 100) {
        alert(`Enter a Number which is smaller than 100`);
    } else if (guess < 1) {
        alert(`Enter a Number which is greater than 1`);
    } else {
        prevGusses.push(guess);
        if (numGuess > 10) {
            displayGuess(guess);
            displayMessage(`Game Over & random nuber was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}
const checkGuess = guess => {
    if (guess == randomNumber) {
        displayMessage(`You won!!`);
        endGame();
    } else if (guess > randomNumber) {
        displayMessage(`Number you entered is too High`);
    } else if (guess < randomNumber) {
        displayMessage(`Number you entered is too Low`);
    }
}
const displayGuess = guess => {
    userInput.value = '';
    guessSlot.innerHTML += `${guess},`;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

const displayMessage = messages => {
    lowOrHi.innerHTML = `<h2>${messages}</h2>`;
}

const endGame = () => {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

const newGame = () => {
    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', () => {
        randomNumber = Math.floor(Math.random() * 100 + 1);
        userInput.value = '';
        userInput.removeAttribute('disabled');
        prevGusses = [];
        numGuess = 1;
        remaining.innerHTML = `${10 - numGuess}`;
        guessSlot.innerHTML = ``;
        startOver.removeChild(p);
        playGame = true;
    })
}
