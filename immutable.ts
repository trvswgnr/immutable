import { ImmutableArray } from "./data-structures/Array";
import { ImmutableBigInt64Array } from "./data-structures/BigInt64Array";

export function immutable<const T>(inst: T): Immutable<T> {
    switch (true) {
        case inst instanceof Array:
            return inst as any;
        case inst instanceof BigInt64Array:
            return inst as any;
        default:
            return inst as any;
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
