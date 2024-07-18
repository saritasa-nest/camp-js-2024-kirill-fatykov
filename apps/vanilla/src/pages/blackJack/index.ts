import { DiceGenerator } from './models/diceGenerator';
import { TurnGenerator } from './models/turnGenerator';
import { Player } from './models/player';
import { AllResultsRollDice } from './models/allResultsRollDice';

const btnRollTheDice = document.querySelector<HTMLButtonElement>('.game__roll-the-dice');
const containerPlayer1 = document.querySelector<HTMLElement>('#Player1');
const containerPlayer2 = document.querySelector<HTMLElement>('#Player2');
const containerAll = document.querySelector<HTMLElement>('#allResults');

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
		if (containerAll.previousElementSibling !== null) {
			containerAll.previousElementSibling.innerHTML = `Dice cap - ${allResults.getSumDices()}`;
		}
		containerAll.innerHTML = allResults.allDice.join(' ');
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
		containerPlayer.closest('.game__item')?.setAttribute('style', 'background-color:rgb(217 59 59 / 100%);');
		btnRollTheDice?.setAttribute('disabled', 'true');
	}
	const preveiousElem = containerPlayer.previousElementSibling;
	const containerPlayerId = containerPlayer?.id;

	if (preveiousElem != null) {
		preveiousElem.innerHTML = `${containerPlayerId} - ${player.getSumDices()}`;
	}
	containerPlayer.innerHTML = player.diceResults.join(' ');
}
