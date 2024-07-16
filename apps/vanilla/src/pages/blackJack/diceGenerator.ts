import { Publisher } from './publisher';
import { Subscriber } from './interface/subscriber';

/** Yeah. */
export class DiceGenerator extends Publisher<number> implements Subscriber<number> {
	/**
		* Yeah.
		* @param sideDice - Asdasd.
		*/

	public constructor(public sideDice = 6) {
		super();
		this.sideDice = sideDice;
	}

	/** Yeah. */
	public rollDice(): number {
		return Math.floor(Math.random() * this.sideDice) + 1;
	}

	/**
		* Yeah.
		* @param currentPlayerIndex - Asdasd.
		*/
	public override notify(currentPlayerIndex: number): void {
		this.subscribers.forEach((sub, index) => {
			if (currentPlayerIndex === index) {
				sub.update(this.rollDice());
			}
		});
	}

	/**
		* Yeah.
		* @param message - Asdasd.
		*/
	public update(message: number): void {
		this.notify(message);
	}

}
