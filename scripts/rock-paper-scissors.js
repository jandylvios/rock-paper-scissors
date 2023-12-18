let yourMove = '';
let gameStatus = JSON.parse(localStorage.getItem('gameStatus')) || {
    win: 0,
    tie: 0,
    lose: 0
};

updateGameStatus();

function pickComputerMove() {
    
    let computerMove = '';
    
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3)
        computerMove = 'rock';
    else if (randomNumber >= 1/3 && randomNumber < 2/3)
        computerMove = 'paper';
    else
        computerMove = 'scissors';
    
    return computerMove;       
}

function updateGamePlay(yourMove, computerMove, result) {
    document.querySelector('.js-game-result')
        .innerHTML = `${result}.`;
    
    document.querySelector('.js-game-moves')
        .innerHTML = `You <img src="images/${yourMove}-emoji.png"> <img src="images/${computerMove}-emoji.png"> Computer`;
}

function updateGameStatus() {
    document.querySelector('.js-game-status')
        .innerHTML = `Wins: ${gameStatus.win}, Losses: ${gameStatus.lose}, Ties: ${gameStatus.tie}`;
}

document.querySelector('js-rock')
    .addEventListener('click', () => {
        compareMoves('rock');
    });

document.querySelector('js-paper')
    .addEventListener('click', () => {
        compareMoves('paper');
    });

document.querySelector('js-scissors')
    .addEventListener('click', () => {
        compareMoves('scissors');
    });

document.querySelector('js-reset')
    .addEventListener('click', () => {
        resetScore();
    });

document.querySelector('js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    });

document.body.querySelector('keydown', (event) => {
    if (event.key === 'r') {
        compareMoves('rock');
    } else if (event.key === 'p') {
        compareMoves('paper');
    } else if (event.key === 's') {
        compareMoves('scissors');
    }
});


function compareMoves(yourMove) {

    const computerMove = pickComputerMove();

    let result = '';
    
    if (yourMove === computerMove)
        result = 'Tie';
    else if (yourMove === 'rock') {
        if (computerMove === 'paper')
            result = 'You lose';
        else if (computerMove === 'scissors')
            result = 'You win';
    } else if (yourMove === 'paper') {
        if (computerMove === 'rock')
            result = 'You win';
        else if (computerMove === 'scissors')
            result = 'You lose';
    } else if (yourMove === 'scissors') {
        if (computerMove === 'rock')
            result = 'You lose';
        else if (computerMove === 'paper')
            result = 'You win';
    }

    if (result === 'You win') {
        gameStatus.win++;
    } else if (result === 'You lose') {
        gameStatus.lose++;
    } else {
        gameStatus.tie++;
    }

    localStorage.setItem('gameStatus', JSON.stringify(gameStatus));
    
    updateGamePlay(yourMove, computerMove, result);
    updateGameStatus();

}

let autoInterval;
let isAuto = false;

function autoPlay() {
    let autoButton = document.querySelector('js-auto-play-button');
    
    if (!isAuto) {
        autoButton.innerHTML = 'Stop Play';
        autoInterval = setInterval(() => {
            compareMoves(pickComputerMove());
        }, 1000);
        isAuto = true;
    } else {
        autoButton.innerHTML = 'Auto Play';
        clearInterval(autoInterval);
        isAuto = false;
    }
}

function resetScore(){
    gameStatus.win = 0;
    gameStatus.lose = 0;
    gameStatus.tie = 0;
    localStorage.removeItem('gameStatus');
}
