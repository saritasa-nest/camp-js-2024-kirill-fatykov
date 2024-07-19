import { DiceGenerator } from './models/diceGenerator';
import { TurnGenerator } from './models/turnGenerator';
import { Player } from './models/player';
import { AllResultsRollDice } from './models/allResultsRollDice';

const buttonRollTheDice = document.querySelector<HTMLButtonElement>('.game__roll-the-dice');
const containerPlayer1 = document.querySelector<HTMLElement>('#player1');
const containerPlayer2 = document.querySelector<HTMLElement>('#player2');
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

buttonRollTheDice?.addEventListener('click', () => {

	turnGenerator.next();

	if (containerAll != null) {
		displayAllResults(containerAll);
	}

	if (containerPlayer1 != null && containerPlayer2 != null) {
		displayDiceResultAndWinner(player1, containerPlayer1);
		displayDiceResultAndWinner(player2, containerPlayer2);
	}
});

/**
	* Function display in web-site all dice result of PLayers.
	* @param containerAllResults - Container for print results.
	*/
function displayAllResults(containerAllResults: HTMLElement): void {
	if (containerAllResults.previousElementSibling !== null) {
		containerAllResults.previousElementSibling.innerHTML = `Dice cap - ${allResults.getSumDices()}`;
	}
	containerAllResults.innerHTML = allResults.printResult();
}

/**
	* Function display in web-site dice result of PLayers.
	* @param player - Info about Player.
	* @param containerPlayer - Container for print results.
	*/
function displayDiceResultAndWinner(player: Player, containerPlayer: HTMLElement): void {
	if (player.getWinner()) {
		containerPlayer.closest('.game__item')?.classList.add('game__winner');
		buttonRollTheDice?.setAttribute('disabled', 'true');
	}
	const previousElement = containerPlayer.previousElementSibling;
	const containerPlayerId = containerPlayer?.id;

	if (previousElement != null) {
		previousElement.innerHTML = `${containerPlayerId[0].toUpperCase()}${containerPlayerId.slice(1)} 
		- ${player.getScore()}`;
	}
	containerPlayer.innerHTML = player.printResult();
}
