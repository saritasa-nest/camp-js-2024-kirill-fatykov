import { DiceGenerator } from './diceGenerator';

/** Yeah. */
export class Player extends DiceGenerator {
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
}
