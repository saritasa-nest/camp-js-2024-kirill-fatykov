import { Subscriber } from '../type/subscriber';

import { Publisher } from './publisher';
const NUMBER_DICE = 6;

/** Generating dice with publisher and subscriber func. */
export class DiceGenerator extends Publisher<number> implements Subscriber<number> {

	public constructor(private readonly sideDice = NUMBER_DICE) {
		super();
	}

	/** It's method take random dice. */
	public rollDice(): number {
		/** I use crypto because SonarCloud don't recommends use Math.random(). */
		const { crypto } = window;
		const array = new Uint8Array(1);
		crypto.getRandomValues(array);
		return array[0] % this.sideDice + 1;
	}

	/**
		* Subscriber with current index give info about dice .
		* @param currentPlayerIndex - Number.
		*/
	public override notify(currentPlayerIndex: number): void {
		this.subscribers.forEach((sub, index) => {
			if (currentPlayerIndex === index) {
				sub.update(this.rollDice());
			}
		});
	}

	/**
		* Give current player index from TurnGenerator.
		* @param currentPlayerIndex - Number.
		*/
	public update(currentPlayerIndex: number): void {
		this.notify(currentPlayerIndex);
	}

}
