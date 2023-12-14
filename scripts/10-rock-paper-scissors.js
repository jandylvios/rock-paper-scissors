let yourMove = '';
let gameStatus = JSON.parse(localStorage.getItem('gameStatus')) || {
    win: 0,
    tie: 0,
    lose: 0
};

updateGameStatus();

function pickComputerMove(yourMove) {
    
    let computerMove = '';
    
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3)
        computerMove = 'rock';
    else if (randomNumber >= 1/3 && randomNumber < 2/3)
        computerMove = 'paper';
    else
        computerMove = 'scissors';
    
    compareMoves(yourMove, computerMove);        
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

function compareMoves(yourMove, computerMove) {

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

function resetScore(){
    gameStatus.win = 0;
    gameStatus.lose = 0;
    gameStatus.tie = 0;
    localStorage.removeItem('gameStatus');
}
