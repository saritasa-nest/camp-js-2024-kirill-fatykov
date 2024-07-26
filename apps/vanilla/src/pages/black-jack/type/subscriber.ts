/** It's type for subscribe. */
export type Subscriber<T> = {

	/** With this func we listen publish. */
	update(message: T): void;
};
