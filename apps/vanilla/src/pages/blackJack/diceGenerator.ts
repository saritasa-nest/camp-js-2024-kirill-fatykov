// eslint-disable-next-line @typescript-eslint/naming-convention
const SIDES__COUNT = 6;

export class DiceGenerator {

	constructor(public sideDice: number = SIDES__COUNT) {
		this.sideDice = sideDice;
	}

	public rollDice() {
		return Math.floor(Math.random() * this.sideDice) + 1;
	}
}
