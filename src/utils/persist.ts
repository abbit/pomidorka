interface Persistable<T> {
	set(value: T | undefined): void;
	get(): T | undefined;
	has(): boolean;
	delete(): void;
}

export class Persist<T> implements Persistable<T> {
	protected storage = window.localStorage;

	constructor(protected name: string, protected defaultValue?: T) {
		if (!this.has()) {
			this.set(defaultValue);
		}
	}

	has() {
		const state = this.storage.getItem(this.name);
		return state !== null;
	}

	set(value: T | undefined) {
		const state = JSON.stringify({
			value,
		});

		this.storage.setItem(this.name, state);
	}

	get() {
		const state = this.storage.getItem(this.name);

		if (!state) {
			return this.defaultValue;
		}

		const record = JSON.parse(state) as { value: T };

		return record.value;
	}

	delete() {
		this.storage.removeItem(this.name);
	}
}

export class ExpiredPersist<T> extends Persist<T> {
	constructor(name: string, protected expiredAt: number, defaultValue?: T) {
		super(name, defaultValue);

		if (this.isExpired()) {
			this.set(defaultValue);
		}
	}

	isExpired(): boolean {
		console.log(this.expiredAt, Date.now());
		return this.expiredAt <= Date.now();
	}

	updateExpireTime(expiredAt: number) {
		this.expiredAt = expiredAt;

		if (this.has()) {
			this.set(this.get());
		}
	}

	set(value: T | undefined) {
		const state = JSON.stringify({
			value,
			expiredAt: this.expiredAt,
		});

		this.storage.setItem(this.name, state);
	}

	get() {
		if (this.isExpired()) {
			return this.defaultValue;
		}

		const state = this.storage.getItem(this.name);

		if (!state) {
			return this.defaultValue;
		}

		const record = JSON.parse(state) as { value: T; expiredAt: number };

		return record.value;
	}
}
