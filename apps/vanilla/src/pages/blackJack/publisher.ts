import { Subscriber } from './interface/subscriber';

/** Yeah. */
export class ConcretePublisher<T> {
	/** Yeah. */
	public subscribers: Subscriber<T>[] = [];

	/**
		* Yeah.
		* @param sub - Yeah.
		*/
	public subscribe(sub: Subscriber<T>): void {
		if (this.subscribers.includes(sub)) {
			this.subscribers.push(sub);
		}
	}

	/**
		* Yeah.
		* @param sub - Yeah.
		*/
	public unsubscribe(sub: Subscriber<T>): void {
		const index: number = this.subscribers.indexOf(sub);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	/**
		* Yeah.
		* @param message - Yeah.
		*/
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}
}
