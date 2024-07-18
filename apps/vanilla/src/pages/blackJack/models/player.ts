import { Subscriber } from '../type/subscriber';

import { Publisher } from './publisher';
const winScore = 21;

/** Player with publisher and subscriber func. */
export class Player extends Publisher<number> implements Subscriber<number> {
	/** All dice results for one player. */
	public readonly diceResults: number[] = [];

	/**
	 * Push result dice roll in general array.
	 * @param dice - Number.
		*/
	public result(dice: number): void {
		this.diceResults.push(dice);
	}

	/** Get sum of all Dices. */
	public getSumDices(): number {
		return this.diceResults.reduce((acc, dice) => acc + dice, 0);
	}

	/** Check win status in general array. */
	public getWinStatus(): boolean {
		if (this.diceResults.reduce((acc, dice) => acc + dice, 0) >= winScore) {
			return true;
		}

		return false;
	}

	/**
		* Take all player's subscribers diceRoll.
		* @param diceRoll - Number.
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
