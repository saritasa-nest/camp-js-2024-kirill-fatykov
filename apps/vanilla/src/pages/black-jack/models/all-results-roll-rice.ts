import { Subscriber } from '../type/subscriber';

/** All results diceRoll push in this class when he subscribe. */
export class AllResultsRollDice implements Subscriber<number> {
	/** Array all diceRoll. */
	private readonly allDice: number[] = [];

	/** Get sum of all Dices. */
	public getSumDices(): number {
		return this.allDice.reduce((acc, dice) => acc + dice, 0);
	}

	/** Make format dices for HtmlElements. */
	public printResult(): string {
		return this.allDice.join(' ');
	}

	/**
		* Listen publisher and take dice.
		* @param dice - Info about dice.
		*/
	public update(dice: number): void {
		this.allDice.push(dice);
	}
}
