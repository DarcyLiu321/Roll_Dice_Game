import './style.scss'

//select element
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScoreElement0 = document.getElementById('current--0');
const currentScoreElement1 = document.getElementById('current--1');

let playing, currentScore, totalScore
let activePlayer = 0;

//create relevant function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //reassign the active player
  player0Element.classList.toggle('player-active');
  player1Element.classList.toggle('player-active');
}

//starting condition
const init = function () {
  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  currentScoreElement0.textContent = 0;
  currentScoreElement1.textContent = 0;

  console.log(document.getElementById(`name--${activePlayer}`));
  //change the name from winner to original name
  document.getElementById(`name--${activePlayer}`).textContent = `player${activePlayer + 1}`;

  totalScore = [0, 0];//totalScore[0] represent the score of player1, totalScore[1] represent the score of player2
  currentScore = 0;
  activePlayer = 0; // here 0 represent player1, 1 represent player2
  playing = true;//if game is keep playing or not


  //not sure who is the winner, so remove from all player
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player-active');
  dice.classList.add('hidden');

}
init();


//rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //random a number between 1 and 6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //display dice
    dice.classList.remove('hidden');
    dice.src = "/dice pic/" + `dice-${diceNumber}.png`;

    //check for dice roll 1, if yes, switch to another player,,if no, add dice roll to current score.
    if (diceNumber !== 1) {
      currentScore += diceNumber; //currentScore = currentScore + diceNumber
      document.getElementById(`current--${activePlayer}`).textContent = currentScore; //build the ID name dynamically

    } else {
      //switch to next player
      switchPlayer();
    }
  }
})

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScore[activePlayer] = totalScore[activePlayer] + currentScore;  //add current score to total score and store into array
    document.getElementById(`score--${activePlayer}`).textContent = totalScore[`${activePlayer}`]; //display total score

    if (totalScore[`${activePlayer}`] < 100) {
      //switch to next player
      switchPlayer();
    } else {
      //active player win
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player-active');
      dice.classList.add('hidden');
    }
  }
})

btnNew.addEventListener('click', init);




