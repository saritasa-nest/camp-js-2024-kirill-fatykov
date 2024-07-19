import { Subscriber } from '../type/subscriber';

/** General class for all publishers. */
export class Publisher<T> {
	/** General array subscribers. */
	protected readonly subscribers: Subscriber<T>[] = [];

	/**
		* Method subscribe - push subscriber in general array.
		* @param subscriber - Info about subscriber.
		*/
	public subscribe(subscriber: Subscriber<T>): void {
		if (!this.subscribers.includes(subscriber)) {
			this.subscribers.push(subscriber);
		}
	}

	/**
		* Method unsubscribe - delete subscriber in general array.
		* @param subscriber - Info about subscriber.
		*/
	public unsubscribe(subscriber: Subscriber<T>): void {
		const index: number = this.subscribers.indexOf(subscriber);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	/**
		* Notify all subscribers.
		* @param message - Message for subscribers.
		*/
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
