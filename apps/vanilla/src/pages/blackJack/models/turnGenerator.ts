import { Publisher } from './publisher';

/** Turn player index with publsher func. */
export class TurnGenerator extends Publisher<number> {

	public constructor(public playerCount = 2) {
		super();
		this.playerCount = playerCount;
	}

	/** Start current index. When make next it change. */
	public currentPlayerIndex = -1;

	/** Change index and notify index all subscribers. */
	public next(): void {
		if (this.currentPlayerIndex === this.playerCount - 1 || this.currentPlayerIndex === -1) {
			this.currentPlayerIndex = 0;
		} else {
			this.currentPlayerIndex += 1;
		}
		this.notify(this.currentPlayerIndex);
	}
}
