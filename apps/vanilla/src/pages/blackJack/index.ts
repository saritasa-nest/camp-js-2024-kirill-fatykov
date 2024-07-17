import { DiceGenerator } from './models/diceGenerator';
import { TurnGenerator } from './models/turnGenerator';
import { Player } from './models/player';
import { AllResultsRollDice } from './models/allResultsRollDice';

const btnRollTheDice = document.querySelector<HTMLButtonElement>('.game__roll-the-dice');
const containerPlayer1 = document.getElementById('Player1');
const containerPlayer2 = document.getElementById('Player2');
const containerAll = document.getElementById('allResults');

const turnGenerator = new TurnGenerator();
const diceGenerator = new DiceGenerator();
const player1 = new Player();
const player2 = new Player();
const allResults = new AllResultsRollDice();

turnGenerator.subscribe(diceGenerator);

diceGenerator.subscribe(player1);
diceGenerator.subscribe(player2);

player1.subscribe(allResults);
player2.subscribe(allResults);

btnRollTheDice?.addEventListener('click', () => {

	turnGenerator.next();
	if (containerAll != null) {
		containerAll.innerText = allResults.allDice.join(' ');
	}

	if (containerPlayer1 != null && containerPlayer2 != null) {
		displayDiceResultAndWinner(player1, containerPlayer1);
		displayDiceResultAndWinner(player2, containerPlayer2);
	}
});

/**
	* Function display in web-site dice resulte of PLayers.
	* @param player - Class Player.
	* @param containerPlayer - HTMLElement.
	*/
function displayDiceResultAndWinner(player: Player, containerPlayer: HTMLElement): void {
	if (player.getWinStatus()) {
		containerPlayer.closest('.game__item')?.setAttribute('style', 'background-color:red;');
		btnRollTheDice?.setAttribute('disabled', 'true');
	}
	containerPlayer.innerText = player.diceResults.join(' ');
}
