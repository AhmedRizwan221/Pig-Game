'use strict';

const score0El = document.getElementById('totalCurrent--0');
const score1El = document.getElementById('totalCurrent--1');
const currentScore0El = document.getElementById('currentScore--0');
const currentScore1El = document.getElementById('currentScore--1');
const diceRoll = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnDice = document.querySelector('.btn--dice');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let activePlayer, currentScore, score, playing;
//Initial conditions 
const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    score = [0, 0];
    diceRoll.classList.add('hidden');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
    document.getElementById(`currentScore--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//starting work on game 
btnDice.addEventListener('click', function () {
    if (playing) {
        //generating random number 
        const diceNum = Math.trunc(Math.random() * 6) + 1;

        //connect dice roll with number 
        diceRoll.src = `dice-${diceNum}.png`;
        //removing hidden class from dice roll
        diceRoll.classList.remove('hidden');
        if (diceNum !== 1) {
            currentScore += diceNum;
            document.querySelector(`#currentScore--${activePlayer}`).textContent = currentScore;
        } else {
            //switching to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        score[activePlayer] += currentScore;
        document.getElementById(`totalCurrent--${activePlayer}`).textContent = score[activePlayer];
        document.getElementById(`currentScore--${activePlayer}`).textContent = 0;

        if (score[activePlayer] >= 20) {
            playing =false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceRoll.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});


btnNew.addEventListener('click', init);
