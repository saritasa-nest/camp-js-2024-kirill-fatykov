import { Subscriber } from '../type/subscriber';

/** General class for all publushers. */
export class Publisher<T> {
	/** General array subscribers. */
	public subscribers: Subscriber<T>[] = [];

	/**
		* Method subscribe.
		* @param sub - Type Subscriber<T>.
		*/
	public subscribe(sub: Subscriber<T>): void {
		if (!this.subscribers.includes(sub)) {
			this.subscribers.push(sub);
		}
	}

	/**
		* Method unsubsribe.
		* @param sub - Type Subscriber<T>.
		*/
	public unsubscribe(sub: Subscriber<T>): void {
		const index: number = this.subscribers.indexOf(sub);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	/**
		* Give message for all subsribers.
		* @param message - It's generic.
		*/
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
