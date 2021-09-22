'use strict';

// Selecting elements
// Player 1 is --0 and Player 2 is --1
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, scoreLimit, playing;

const newGame = function () {
  // Initial  variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  scoreLimit = 20;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

newGame();

// Game Logic

const switchPlayer = function () {
  // Switch to the next player using a ternary function.
  // if activePlayer is --0 then change to --1, and vice versa.
  activePlayer = activePlayer === 0 ? 1 : 0;
  // resets the current score when activePlayer switches
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switches player--active class between player 1 and 2
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      // Dynamically assigns the current score to the current player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is  >= 100
    // Finish the game
    if (scores[activePlayer] >= scoreLimit) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // else Switch to next player
      switchPlayer();
    }
  }
});

// Resets game upon "NEW GAME" button click
btnNew.addEventListener('click', newGame);
