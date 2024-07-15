const SIDES__COUNT = 6;

class DiceGenerator {
	private readonly sideDice: number = SIDES__COUNT;

	rollDice() {
		return Math.floor(Math.random() * this.sideDice) + 1;
	}
}

const a = new DiceGenerator();
console.log(a.rollDice());