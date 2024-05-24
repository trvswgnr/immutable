import {
    ImmutableArrayBuffer,
    ImmutableArray,
    ImmutableBigInt64Array,
    ImmutableBigUint64Array,
    ImmutableDataView,
} from "./data-structures";

const associations = [
    [Array, ImmutableArray],
    [ArrayBuffer, ImmutableArrayBuffer],
    [BigInt64Array, ImmutableBigInt64Array],
    [BigUint64Array, ImmutableBigUint64Array],
    [DataView, ImmutableDataView],
] as const;

const map: WeakMap<BuiltinClass, ImmutableBuiltinClass> = new WeakMap(associations as any);

type Associations = typeof associations;

type BuiltinClass = (typeof associations)[number][0];
type ImmutableBuiltinClass = (typeof associations)[number][1];

export function Immutable<const T extends BuiltinClass>(ctor: T): Immutable<T> {
    return map.get(ctor) as any;
}

export type Immutable<
    T extends BuiltinClass,
    Asses extends readonly any[] = Associations,
> = Asses extends readonly [readonly [infer C, infer I], ...infer Rest]
    ? C extends T
        ? I
        : Immutable<T, Rest>
    : never;
