import { DiceGenerator } from './models/diceGenerator';
import { TurnGenerator } from './models/turnGenerator';
import { Player } from './models/player';
import { AllResultsRollDice } from './models/allResultsRollDice';

const btnRollTheDice: HTMLButtonElement | null = document.querySelector('.game__roll-the-dice') as HTMLButtonElement;
const containerPlayer1: HTMLElement | null = document.querySelector('.game__content1') as HTMLElement;
const containerPlayer2: HTMLElement | null = document.querySelector('.game__content2') as HTMLElement;
const containerAll: HTMLElement | null = document.querySelector('.game__contentAll') as HTMLElement;

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

	/**
		* Function display in web-site dice resulte of PLayers.
		* @param player - Class Player.
		* @param containerPlayer - HTMLElement.
		*/
	function displayDiceResultAndWinner(player: Player, containerPlayer: HTMLElement): void {
		if (player.getWinStatus()) {
			containerPlayer?.closest('.game__item')?.setAttribute('style', 'background-color:red;');
			btnRollTheDice?.setAttribute('disabled', 'true');
		}
		containerPlayer.innerText = player.diceResults.join(' ');
	}

	turnGenerator.next();
	containerAll.innerText = allResults.allDice.join(' ');

	displayDiceResultAndWinner(player1, containerPlayer1);
	displayDiceResultAndWinner(player2, containerPlayer2);
});
