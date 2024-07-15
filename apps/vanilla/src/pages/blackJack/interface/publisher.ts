import { Subscriber } from './subscriber';

/** Yeah. */
export class Publisher<T> {
	/** Yeah. */
	public subscribers: Subscriber<T>[] = [];

	/** Yeah. */
	public subscribe(s: Subscriber<T>): void {
		const index: number = this.subscribers.indexOf(s);
		if (!index) {
			this.subscribers.push(s);
		}
	}

	/** Yeah. */
	public unsubscribe(s: Subscriber<T>): void {
		const index: number = this.subscribers.indexOf(s);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	/** Yeah. */
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
