let yourMove = '';
let gameStatus = JSON.parse(localStorage.getItem('gameStatus'));

updateGameStatus();

function pickComputerMove() {
    
    let computerMove = '';
    
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    if (randomNumber === 1)
        computerMove = 'rock';
    else if (randomNumber === 2)
        computerMove = 'paper';
    else if (randomNumber === 3)
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

document.querySelector('.js-rock')
    .addEventListener('click', () => {
        compareMoves('rock');
    });

document.querySelector('.js-paper')
    .addEventListener('click', () => {
        compareMoves('paper');
    });

document.querySelector('.js-scissors')
    .addEventListener('click', () => {
        compareMoves('scissors');
    });

document.querySelector('.js-reset')
    .addEventListener('click', () => {
        resetScore();
        updateGameStatus();
    });

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        playOption();
    });

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        compareMoves('rock');
    } else if(event.key === 'p') {
        compareMoves('paper');
    } else if(event.key === 's'){
        compareMoves('scissors');
    }
});


function compareMoves(yourMove) {

    let computerMove = pickComputerMove();

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

function resetScore() {
    gameStatus.win = 0;
    gameStatus.lose = 0;
    gameStatus.tie = 0;
}

let auto = false;
let autoInterval;

function playOption() {
    let option = document.querySelector('.js-auto-play-button');

    if (!auto) {
        option.innerHTML = 'Stop Play';     
        autoInterval = setInterval(() => {
            compareMoves(pickComputerMove());
        }, 1000);
        auto = true;
    } else {        
        option.innerHTML = 'Auto Play';
        clearInterval(autoInterval);
        auto = false;
    }

}
