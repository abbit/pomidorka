interface Persistence<T> {
	set(value: T): void;
	get(): T | undefined;
	has(): boolean;
	delete(): void;
}

export function createPersistence<T>(name: string, placeholder?: T): Persistence<T> {
	const storage = window.localStorage;

	return {
		set: (value) => {
			const state = JSON.stringify({
				value,
			});
			storage.setItem(name, state);
		},

		has: () => {
			const state = storage.getItem(name);
			return state !== null;
		},

		get: () => {
			const state = storage.getItem(name);
			if (state === null) return placeholder;
			const record = JSON.parse(state) as { value: T };
			return record.value;
		},

		delete: () => storage.removeItem(name),
	};
}
