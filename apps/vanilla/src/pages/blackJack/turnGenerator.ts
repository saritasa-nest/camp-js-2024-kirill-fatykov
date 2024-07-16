import { Publisher } from './publisher';

/** Yeah. */
export class TurnGenerator extends Publisher<number> {

	public constructor(public playerCount = 2) {
		super();
		this.playerCount = playerCount;
	}

	/** Yeah. */
	public currentPlayerIndex = -1;

	/** Yeah. */
	public next(): void {
		if (this.currentPlayerIndex === this.playerCount - 1 || this.currentPlayerIndex === -1) {
			this.currentPlayerIndex = 0;
		} else {
			this.currentPlayerIndex += 1;
		}
		this.notify(this.currentPlayerIndex);
	}
}
