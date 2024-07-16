import { DiceGenerator } from './diceGenerator';
import { TurnGenerator } from './turnGenerator';
import { Player } from './player';

const turnGenerator = new TurnGenerator();
const diceGenerator = new DiceGenerator();
const player1 = new Player();
const player2 = new Player();
turnGenerator.subscribe(diceGenerator);

diceGenerator.subscribe(player1);
diceGenerator.subscribe(player2);
