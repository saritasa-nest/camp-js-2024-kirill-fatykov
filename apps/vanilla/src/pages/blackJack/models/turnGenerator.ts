import { Publisher } from './publisher';
const START_INDEX = -1;

/** Turn player index with publsher func. */
export class TurnGenerator extends Publisher<number> {

	public constructor(private readonly playerCount = 2) {
		super();
		this.playerCount = playerCount;
	}

	/** Start current index. When make next it change. */
	private currentPlayerIndex = START_INDEX;

	/** Change index and notify index all subscribers. */
	public next(): void {
		if (this.currentPlayerIndex === this.playerCount - 1 || this.currentPlayerIndex === START_INDEX) {
			this.currentPlayerIndex = 0;
		} else {
			this.currentPlayerIndex += 1;
		}
		this.notify(this.currentPlayerIndex);
	}
}
