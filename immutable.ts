export function immutable<const T>(inst: T): Immutable<T> {
    switch (true) {
        case inst instanceof Array:
            return inst
        case inst instanceof BigInt64Array:
            return inst;
        default:
            return inst;
    }
}

export type Immutable<T> = T extends ReadonlyArray<infer U>
    ? ImmutableArray<U>
    : T extends BigInt64Array
    ? ImmutableBigInt64Array
    : ImmutableObject<T>;

export type ImmutableObject<T> = {
    readonly [K in keyof T]: T[K];
};

const test = immutable({ a: 1, b: 2, c: 3 });
