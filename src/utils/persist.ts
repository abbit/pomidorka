interface Persistable<T> {
	set(value: T | undefined): void;
	get(): T | undefined;
	has(): boolean;
	delete(): void;
}

export class Persist<T> implements Persistable<T> {
	private storage = window.localStorage;

	constructor(
		private name: string,
		private defaultValue?: T,
		private expiredAt?: number,
	) {
		if (!this.has()) {
			this.set(defaultValue);
		}

		if (this.isExpired(this.getExpireTime())) {
			this.set(defaultValue);
		}
	}

	private isExpired(expiredAt: number | undefined): boolean {
		return expiredAt !== undefined && expiredAt <= Date.now();
	}

	private getExpireTime(): number | undefined {
		const state = this.storage.getItem(this.name);

		if (!state) {
			return undefined;
		}

		const record = JSON.parse(state) as { value: T; expiredAt: number | undefined };

		return record.expiredAt;
	}

	has() {
		const state = this.storage.getItem(this.name);
		return state !== null;
	}

	set(value: T | undefined) {
		const state = JSON.stringify({
			value,
			expiredAt: this.expiredAt,
		});

		this.storage.setItem(this.name, state);
	}

	updateExpireTime(expiredAt: number) {
		this.expiredAt = expiredAt;

		if (this.has()) {
			this.set(this.get());
		}
	}

	get() {
		const state = this.storage.getItem(this.name);

		if (!state) {
			return this.defaultValue;
		}

		const record = JSON.parse(state) as { value: T; expiredAt: number | undefined };

		if (!this.isExpired(record.expiredAt)) {
			return record.value;
		} else {
			return this.defaultValue;
		}
	}

	delete() {
		this.storage.removeItem(this.name);
	}
}
