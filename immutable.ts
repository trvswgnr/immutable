import { ImmutableArrayBuffer, ImmutableArray, ImmutableBigInt64Array } from "./data-structures";

const associations = [
    [Array, ImmutableArray],
    [ArrayBuffer, ImmutableArrayBuffer],
    [BigInt64Array, ImmutableBigInt64Array],
] as const;

const map: WeakMap<BuiltinClass, ImmutableClass> = new WeakMap(associations as any);

type Associations = typeof associations;

type BuiltinClass = (typeof associations)[number][0];
type ImmutableClass = (typeof associations)[number][1];

export function Immutable<const T extends BuiltinClass>(ctor: T): Immutable<T> {
    return map.get(ctor) as Immutable<T>;
}

export type Immutable<
    T extends BuiltinClass,
    Asses extends readonly any[] = Associations,
> = Asses extends readonly [readonly [infer C, infer I], ...infer Rest]
    ? C extends T
        ? I
        : Immutable<T, Rest>
    : never;
