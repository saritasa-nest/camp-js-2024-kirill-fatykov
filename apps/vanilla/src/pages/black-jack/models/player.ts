import { Subscriber } from '../type/subscriber';

import { Publisher } from './publisher';
const WIN_SCORE = 21;

/** Player with publisher and subscriber func. */
export class Player extends Publisher<number> implements Subscriber<number> {
	/** All dice results for one player. */
	private readonly diceResults: number[] = [];

	/**
		* Push result dice roll in general array.
		* @param dice - Number.
		*/
	public result(dice: number): void {
		this.diceResults.push(dice);
	}

	/** Get sum of all Dices. */
	public getScore(): number {
		return this.diceResults.reduce((acc, dice) => acc + dice, 0);
	}

	/** Check win status in general array. */
	public getWinner(): boolean {
		return this.getScore() >= WIN_SCORE;
	}

	/** Make format dices for HtmlElements. */
	public printResult(): string {
		return this.diceResults.join(' ');
	}

	/**
		* Take all player's subscribers diceRoll.
		* @param diceRoll - Info about dice.
		*/
	public override notify(diceRoll: number): void {
		this.subscribers.forEach(subscriber => {
			subscriber.update(diceRoll);
		});
	}

	/**
		* Give diceRoll from DiceGenerator.
		* @param diceResult - Number.
		*/
	public update(diceResult: number): void {
		this.result(diceResult);
		this.notify(diceResult);
	}
}
