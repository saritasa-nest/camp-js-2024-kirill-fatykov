import { Subscriber } from '../interface/subscriber';

import { Publisher } from './publisher';

/** Yeah. */
export class Player extends Publisher<number> implements Subscriber<number> {
	/** Yeah. */
	public diceResults: number[] = [];

	/**
	 * Yeah.
	 * @param dice - Asadas.
		*/
	public results(dice: number): void {
		this.diceResults.push(dice);
	}

	/** Yeah. */
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
		* Yeah.
		* @param playerResult - Asadas.
		*/
	public override notify(playerResult: number): void {
		this.subscribers.forEach(subscriber => {
			subscriber.update(playerResult);
		});
	}

	/**
		* Yeah.
		* @param diceResult - Asadas.
		*/
	public update(diceResult: number): void {
		this.diceResults.push(diceResult);
		this.notify(diceResult);
	}
}
