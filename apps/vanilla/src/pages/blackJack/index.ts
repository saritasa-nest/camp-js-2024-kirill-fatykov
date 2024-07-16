import { DiceGenerator } from './models/diceGenerator';
import { TurnGenerator } from './models/turnGenerator';
import { Player } from './models/player';
import { AllResultsRollDice } from './models/allResultsRollDice';

const btnRollTheDice: HTMLButtonElement | null = document.querySelector('.game__roll-the-dice') as HTMLButtonElement;
const containerPlayer1: HTMLDivElement | null = document.querySelector('.game__content1') as HTMLDivElement;
const containerPlayer2: HTMLDivElement | null = document.querySelector('.game__content2') as HTMLDivElement;
const containerAll: HTMLDivElement | null = document.querySelector('.game__contentAll') as HTMLDivElement;

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
	containerPlayer1.innerText = player1.diceResults.join(' ');
	containerPlayer2.innerText = player2.diceResults.join(' ');
	containerAll.innerText = allResults.allDice.join(' ');

	if (player1.winStatus()) {
		containerPlayer1.closest('.game__item')?.setAttribute('style', 'background-color:red;');
		btnRollTheDice.setAttribute('disabled', 'true');
	}
	if (player2.winStatus()) {
		containerPlayer2.closest('.game__item')?.setAttribute('style', 'background-color:red;');
		btnRollTheDice.setAttribute('disabled', 'true');
	}
});
