class Publisher<T> {
	subscribers: T[];
	constructor(subscribes: T[]) {
		this.subscribers = [];
	}
};
