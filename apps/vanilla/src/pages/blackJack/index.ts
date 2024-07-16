import { DiceGenerator } from './models/diceGenerator';
import { TurnGenerator } from './models/turnGenerator';
import { Player } from './models/player';
import { AllResultsRollDice } from './models/allResultsRollDice';

const btnRollTheDice = document.querySelector('.game__roll-the-dice') as HTMLElement;
const containerPlayer1 = document.querySelector('.game__content1') as HTMLElement;
const containerPlayer2 = document.querySelector('.game__content2') as HTMLElement;
const containerAll = document.querySelector('.game__contentAll') as HTMLElement;

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
		containerPlayer1.style.backgroundColor = 'red';
		btnRollTheDice.setAttribute('disabled', 'true');
	}
	if (player2.winStatus()) {
		containerPlayer2.style.backgroundColor = 'red';
		btnRollTheDice.setAttribute('disabled', 'true');
	}
});
