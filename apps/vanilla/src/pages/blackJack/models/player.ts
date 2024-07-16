import { Subscriber } from '../type/subscriber';

import { Publisher } from './publisher';

/** Player with publisher and subscriber func. */
export class Player extends Publisher<number> implements Subscriber<number> {
	/** All dice results for one player. */
	public diceResults: number[] = [];

	/**
	 * Push result dice roll in general array.
	 * @param dice - Number.
		*/
	public result(dice: number): void {
		this.diceResults.push(dice);
	}

	/** Check win status in general array. */
	public winStatus(): boolean {
		if (this.diceResults.length === 0) {
			return false;
		}

		if (this.diceResults.reduce((acc, dice) => acc + dice, 0) >= 21) {
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
