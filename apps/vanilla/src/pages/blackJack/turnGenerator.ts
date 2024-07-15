/** Yeah. */
export class TurnGenerator {

	public constructor(public playerCount = 2) {
		this.playerCount = playerCount;
	}

	/** Yeah. */
	public currentPlayerIndex = 0;

	/** Yeah. */
	public next(): void {
		if (this.currentPlayerIndex === this.playerCount - 1) {
			this.currentPlayerIndex = 0;
		} else {
			this.currentPlayerIndex += 1;
		}

	}
}
