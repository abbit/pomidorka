interface Persistable<T> {
	set(value: T | undefined): void;
	get(): T | undefined;
	has(): boolean;
	delete(): void;
}

interface State<T> {
	value: T;
}
interface ExpiredState<T> extends State<T> {
	expiredAt: number;
}

export class Persist<T> implements Persistable<T> {
	private storage = window.localStorage;

	constructor(private name: string, private defaultValue?: T) {
		if (!this.has()) {
			this.setWithDefaultValue();
		}
	}

	private parseState = (state: string): State<T> => JSON.parse(state);

	private getState(): State<T> | undefined {
		const state = this.storage.getItem(this.name);

		if (!state) {
			return undefined;
		}

		const parsedState = this.parseState(state);

		return parsedState;
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

	setWithDefaultValue() {
		this.set(this.defaultValue);
	}

	get() {
		const state = this.getState();

		if (!state) {
			return this.defaultValue;
		}

		return state.value;
	}

	delete() {
		this.storage.removeItem(this.name);
	}
}

export class ExpiredPersist<T> implements Persistable<T> {
	private storage = window.localStorage;

	constructor(private name: string, private expiredAt: number, private defaultValue?: T) {
		if (!this.has() || this.isExpired()) {
			this.setWithDefaultValue();
		}
	}

	private parseState = (state: string): ExpiredState<T> => JSON.parse(state);

	private getState(): ExpiredState<T> | undefined {
		const state = this.storage.getItem(this.name);

		if (!state) {
			return undefined;
		}

		const parsedState = this.parseState(state);

		return parsedState;
	}

	isExpired(): boolean {
		const state = this.getState();

		if (!state) {
			return false;
		}

		return state.expiredAt <= Date.now();
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

	setWithDefaultValue() {
		this.set(this.defaultValue);
	}

	get() {
		if (this.isExpired()) {
			return this.defaultValue;
		}

		const state = this.getState();

		if (!state) {
			return this.defaultValue;
		}

		return state.value;
	}

	has() {
		const state = this.storage.getItem(this.name);
		return state !== null;
	}

	delete() {
		this.storage.removeItem(this.name);
	}
}
