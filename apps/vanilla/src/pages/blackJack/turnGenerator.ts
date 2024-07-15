export class TurnGenerator {

	constructor(public playerCount: number = 2) {
		this.playerCount = playerCount;
	}

	public currentPlayerIndex: number = 0;

	public next() {
		if (this.currentPlayerIndex === this.playerCount - 1) {
			this.currentPlayerIndex = 0;
		} else {
			this.currentPlayerIndex += 1;
		}
	}
}
