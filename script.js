const winCombinations = 
[[0,1,2],
[3,4,5],
[6,7,8],
[0,4,8],
[2,4,6],
[0,3,6],
[1,4,7],
[2,5,8]];

const playerOne = (function() {
	let score = [];
	return { score };
})();

const playerTwo = (function() {
	let score = [];
	return { score };
})();

const gameBoard = (function() {
	const gameBoardContainer = document.getElementById('game-board');	
	const drawGameBoard = function() {
		for (i=0; i<9; i++) {
			const gridCell = document.createElement('div');
			gridCell.className = 'grid-item';
			gridCell.id = i;
			gridCell.addEventListener('click', () => { 
				gamePlay.playTurn(parseInt(gridCell.id,10));
			});
			gameBoardContainer.appendChild(gridCell);
		}
	}

	return { drawGameBoard };
})();

gameBoard.drawGameBoard();
const gridCells = document.getElementsByClassName('grid-item');

const gamePlay = (function() {
	let gridCellsPlayed = [];
	let playerTurn = 1;
	let playerHasWon = false;
	const victoryMessage = document.getElementById('victory-message');
	const playTurn = function(score) {
		if (playerTurn === 1 && playerHasWon === false && !gridCellsPlayed.includes(score)) {
			console.log('Player 1 scores ' + score);
			playerOne.score.push(score);
			gridCellsPlayed.push(score);
			gamePlay.checkForWin(gamePlay.winCombinations, playerOne.score, 'one');
			drawXO(gridCells[score]);
			return playerTurn = 2;
		}
		if (playerTurn === 2 && playerHasWon === false && !gridCellsPlayed.includes(score)) {
			console.log('Player 2 scores ' + score);
			playerTwo.score.push(score);
			gridCellsPlayed.push(score);
			gamePlay.checkForWin(gamePlay.winCombinations, playerTwo.score, 'two');
			drawXO(gridCells[score]);			
			return playerTurn = 1;
		}
	}

	const drawXO = function(gridCell) {
		const boardMarker = document.createElement('h1');
		if (playerTurn === 1) {
			boardMarker.innerHTML = "X";
		} else {
			boardMarker.innerHTML = "O";
		}
		gridCell.appendChild(boardMarker);
	}


	function checkForWin(winCombinations, playerScore, playerWinner) {
		for (i=0; i<winCombinations.length; i++) {
			if (arrayContainsArray(winCombinations[i], playerScore) == true) {
				playerHasWon = true;
				victoryMessage.innerHTML = 'Player ' + playerWinner + ' wins!';
				return console.log('Player '+ playerWinner + ' wins!');
			}
		}
	}

	function resetGame() {
		for (i=0; i<gridCells.length; i++) {
			gridCells[i].innerHTML = "";
		}
		playerOne.score = [];
		playerTwo.score = [];
		gridCellsPlayed = [];
		victoryMessage.innerHTML = "";
		playerHasWon = false;		
	}

	return { gridCellsPlayed, playTurn, checkForWin, winCombinations, drawXO, resetGame };
})();


function arrayContainsArray(arrayOne, arrayTwo) {
	return arrayOne.every(function(value) { 
		return arrayTwo.indexOf(value) > -1; 
	});
}