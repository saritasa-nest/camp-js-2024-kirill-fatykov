import { Subscriber } from '../interface/subscriber';

/** Yeah. */
export class AllResultsRollDice implements Subscriber<number> {
	/** Yeah. */
	public allDice: number[] = [];

	/**
		* Yeah.
		* @param message - Asdasd.
		*/
	public update(message: number): void {
		this.allDice.push(message);
	}
}
