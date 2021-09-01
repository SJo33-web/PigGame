//variables' global declaration

let scores, roundScore, activePlayer, gamePlaying, counter, dice1, dice2;

init();


document.querySelector('.btn-roll').addEventListener('click', function btn() {
    for (counter = 3; counter > 0; counter--) {

        if (gamePlaying) {
            //steps
            //1.Random number

            roundScore = 0;
            dice1 = Math.floor(Math.random() * 6) + 1;
            dice2 = Math.floor(Math.random() * 6) + 1;

            //2.Display the results
            displayDice();

            //3.Upadte the roundscore IF the number rolled is NOT one
            if ((dice1 !== 1 && dice2 == 1) || (dice1 == 1 && dice2 !== 1) || (dice1 !== 1 && dice2 !== 1)) {
                //Add the score to roundscore
                roundScore += (dice1 + dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
            else {
                //NextPlayer
                nextPlayer();
            }

        }
        continue;

    }

});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //What to do
        //Add the currentsocre to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let input = document.querySelector('.final-score').value;
        let winningScore;

        // Undefined,null,0 or "" are coerced to false
        // Anythingessle to true
        if (input) {
            winningScore = input;

        } else {
            winningScore = 100;
        }

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' is the Winner!!!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            //Nextplayer
            nextPlayer();
        }

    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    /* Initialisning variables*/
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

// To display dice details
function displayDice() {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

}

