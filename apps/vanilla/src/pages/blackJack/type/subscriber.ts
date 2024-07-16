/** It's type for subscribe with generic. */
export type Subscriber<T> = {

	/** With this func we listen publish. */
	update(message: T): void;
};
