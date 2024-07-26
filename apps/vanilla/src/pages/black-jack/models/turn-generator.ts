import { Publisher } from './publisher';
const START_INDEX = 0;

/** Turn player index with publisher function. */
export class TurnGenerator extends Publisher<number> {

	public constructor(private readonly playerCount = 2) {
		super();
	}

	/** Start current turn. When make next it change. */
	private currentTurn = START_INDEX;

	/** Change turn player and notify index all subscribers. */
	public next(): void {
		const currentPlayerIndex = this.currentTurn % this.playerCount;
		this.notify(currentPlayerIndex);
		this.currentTurn += 1;
	}
}
