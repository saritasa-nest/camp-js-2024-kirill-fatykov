/** Yeah. */
export class DiceGenerator {
	/**
		* Yeah.
		* @param sideDice - Asdasd.
		*/

	public constructor(public sideDice = 6) {
		this.sideDice = sideDice;
	}

	/** Yeah. */
	public rollDice(): number {
		return Math.floor(Math.random() * this.sideDice) + 1;
	}
}
