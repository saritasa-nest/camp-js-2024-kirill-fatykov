import { Subscriber } from '../type/subscriber';

import { Publisher } from './publisher';
const numberDice = 6;

/** Generat dice with publisher and subscriber func. */
export class DiceGenerator extends Publisher<number> implements Subscriber<number> {
	/**
		* Input data.
		* @param sideDice - Which sides in dice.
		*/

	public constructor(public sideDice = numberDice) {
		super();
		this.sideDice = sideDice;
	}

	/** It's method take random dice. */
	public rollDice(): number {
		const { crypto } = window;
		const array = new Uint8Array(1);
		crypto.getRandomValues(array);
		return array[0] % this.sideDice + 1;
	}

	/**
		* Subscriber with cuurent index give info about dice .
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
