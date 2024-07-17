import { Subscriber } from '../type/subscriber';

/** All results diceRoll push in this class when he subscribe. */
export class AllResultsRollDice implements Subscriber<number> {
	/** Array all diceRoll. */
	public readonly allDice: number[] = [];

	/**
		* Listen publisher and take dice.
		* @param dice - Number.
		*/
	public update(dice: number): void {
		this.allDice.push(dice);
	}
}
