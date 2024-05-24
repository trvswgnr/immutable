import type { HasSameKeys, IsUniqueArray, TSError, TuplifyUnion, UniqueArray } from "./utils";

export const builtinCtors = [
    Array,
    ArrayBuffer,
    BigInt64Array,
    BigUint64Array,
    Boolean,
    DataView,
    Date,
    Error,
    EvalError,
    Float32Array,
    Float64Array,
    Function,
    Int8Array,
    Int16Array,
    Int32Array,
    Map,
    Number,
    Object,
    Promise,
    Proxy,
    RangeError,
    ReferenceError,
    RegExp,
    Set,
    SharedArrayBuffer,
    String,
    SyntaxError,
    TypeError,
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    URIError,
    WeakMap,
    WeakSet,
] as const;

console.log(Object.keys(builtinCtors).join(",\n"));

type BuiltinCtors = typeof builtinCtors;

export type BuiltinCtor = BuiltinCtors[number];

type OnlyMethods<T> = {
    [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

type OnlyProps<T> = {
    [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};

type NoInfer<A extends any> = [A][A extends any ? 0 : never];

export function ex<
    T extends BuiltinCtor,
    I extends InstanceType<T>,
    Methods extends keyof OnlyMethods<I>,
    Props extends keyof OnlyProps<I>,
    const A extends Methods[],
    const B extends Props[],
>(
    constructor: T,
    mutatingMethods?: IsUniqueArray<A> extends true
        ? A
        : TSError<"duplicate elements found in array">,
    mutatingProperties?: IsUniqueArray<B> extends true
        ? B
        : TSError<"duplicate elements found in array">,
) {
    return {
        constructor,
        mutatingMethods: mutatingMethods ?? ([] as unknown as A),
        mutatingProperties: mutatingProperties ?? ([] as unknown as B),
    };
}

const exclusions = [
    ex(Array, ["push", "pop", "shift", "unshift", "splice", "sort", "reverse", "fill"], []),
    ex(ArrayBuffer, ["resize"]),
    ex(BigInt64Array, ["reverse", "sort", "fill"]),
    ex(BigUint64Array, ["reverse", "sort", "fill"]),
    ex(Boolean),
    ex(DataView, [
        "setBigInt64",
        "setBigUint64",
        "setFloat32",
        "setFloat64",
        "setInt16",
        "setInt32",
        "setInt8",
        "setUint16",
        "setUint32",
        "setUint8",
    ]),
    ex(Date, [
        "setDate",
        "setFullYear",
        "setHours",
        "setMilliseconds",
        "setMinutes",
        "setMonth",
        "setSeconds",
        "setTime",
        "setUTCDate",
        "setUTCFullYear",
        "setUTCHours",
        "setUTCMilliseconds",
        "setUTCMinutes",
        "setUTCMonth",
        "setUTCSeconds",
    ]),
    ex(Error, [], ["cause", "message", "name", "stack"]),
    ex(EvalError, [], ["cause", "message", "name", "stack"]),
    ex(Float32Array, ["reverse", "sort", "fill"]),
    ex(Float64Array, ["reverse", "sort", "fill"]),
    ex(Function),
    ex(Int8Array, ["reverse", "sort", "fill"]),
    ex(Int16Array, ["reverse", "sort", "fill"]),
    ex(Int32Array, ["reverse", "sort", "fill"]),
    ex(Map, ["set", "delete", "clear"]),
    ex(Number),
    ex(Object, [], ["constructor"]),
    ex(Promise),
    ex(Proxy),
    ex(RegExp),
    ex(Set, ["add", "delete", "clear"]),
    ex(SharedArrayBuffer, ["grow"]),
    ex(String),
    ex(SyntaxError, [], ["cause", "message", "name", "stack"]),
    ex(TypeError, [], ["cause", "message", "name", "stack"]),
    ex(Uint8Array, ["reverse", "sort", "fill"]),
    ex(Uint8ClampedArray, ["reverse", "sort", "fill"]),
    ex(Uint16Array, ["reverse", "sort", "fill"]),
    ex(Uint32Array, ["reverse", "sort", "fill"]),
    ex(URIError, [], ["cause", "message", "name", "stack"]),
    ex(WeakMap, ["set", "delete"]),
    ex(WeakSet, ["add", "delete"]),
] as const;

type Exclusion<
    T,
    Exclusions extends readonly any[] = typeof exclusions,
> = Exclusions extends readonly [infer U, ...infer R]
    ? U extends {
          constructor: T;
      }
        ? U
        : Exclusion<T, R>
    : never;

export type RemoveEmptyArrayFromUnion<T> = T extends readonly any[]
    ? T["length"] extends 0
        ? never
        : T
    : T;

type ExclusionMap<T extends BuiltinCtor> = Map<T, Exclusion<T>>;
type MutatingMethods<T> = RemoveEmptyArrayFromUnion<Exclusion<T>["mutatingMethods"]>;
type MutatingProperties<T extends BuiltinCtor> = Exclusion<T>["mutatingProperties"];

type Immutable<T> = Omit<T, keyof MutatingMethods<T>>;
type t = Immutable<[1, 2, 3]>;

const CTOR_MAP: ExclusionMap<BuiltinCtor> = new Map(
    exclusions.map((e) => [e.constructor, e]),
) as any;

function findExclusion<T extends BuiltinCtor>(ctor: T): Exclusion<T> | undefined {
    return CTOR_MAP.get(ctor) as Exclusion<T> | undefined;
}

export function findMutatingMethods<T extends BuiltinCtor>(ctor: T): MutatingMethods<T> {
    return (findExclusion(ctor) as any).mutatingMethods ?? [];
}

export type Fn<T = any, A extends readonly any[] = any[]> = (...args: A) => T;
