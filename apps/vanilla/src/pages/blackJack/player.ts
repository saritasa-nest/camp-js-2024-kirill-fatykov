import { Publisher } from './publisher';
import { Subscriber } from './interface/subscriber';

type PlayerResult = {

	/** Yeah. */
	winStatus: boolean;

	/** Yeah. */
	diceResult: number;
};

/** Yeah. */
export class Player extends Publisher<PlayerResult> implements Subscriber<number> {
	/** Yeah. */
	public diceResults: number[] = [];

	/**
	 * Yeah.
	 * @param dice - Asadas.
		*/
	public results(dice: number): void {
		this.diceResults.push(dice);
	}

	/** Yeah. */
	public winStatus(): boolean {
		if (this.diceResults.length === 0) {
			return false;
		}

		if (this.diceResults.reduce((acc, dice) => acc + dice, 0) >= 21) {
			return true;
		}

		return false;
	}

	/**
	 * Yeah.
	 * @param playerResult - Asadas.
		*/
	public override notify(playerResult: PlayerResult): void {
		this.subscribers.forEach(sub => sub.update(playerResult));
	}

	/**
		* Yeah.
		* @param diceResult - Asadas.
		*/
	public update(diceResult: number): void {
		this.results(diceResult);
		this.notify({ winStatus: this.winStatus(), diceResult });
	}
}
