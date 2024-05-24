export const builtinCtors = {
    Array: {
        ctor: Array,
        inst: new Array(),
    },
    ArrayBuffer: {
        ctor: ArrayBuffer,
        inst: new ArrayBuffer(0),
    },
    BigInt64Array: {
        ctor: BigInt64Array,
        inst: new BigInt64Array(0),
    },
    BigUint64Array: {
        ctor: BigUint64Array,
        inst: new BigUint64Array(0),
    },
    Boolean: {
        ctor: Boolean,
        inst: new Boolean(false),
    },
    DataView: {
        ctor: DataView,
        inst: new DataView(new ArrayBuffer(0)),
    },
    Date: {
        ctor: Date,
        inst: new Date(),
    },
    Error: {
        ctor: Error,
        inst: new Error(),
    },
    EvalError: {
        ctor: EvalError,
        inst: new EvalError(),
    },
    Float32Array: {
        ctor: Float32Array,
        inst: new Float32Array(0),
    },
    Float64Array: {
        ctor: Float64Array,
        inst: new Float64Array(0),
    },
    Function: {
        ctor: Function,
        inst: new Function(),
    },
    Int8Array: {
        ctor: Int8Array,
        inst: new Int8Array(0),
    },
    Int16Array: {
        ctor: Int16Array,
        inst: new Int16Array(0),
    },
    Int32Array: {
        ctor: Int32Array,
        inst: new Int32Array(0),
    },
    Map: {
        ctor: Map,
        inst: new Map(),
    },
    Number: {
        ctor: Number,
        inst: new Number(0),
    },
    Object: {
        ctor: Object,
        inst: new Object(),
    },
    Promise: {
        ctor: Promise,
        inst: new Promise(() => {}),
    },
    Proxy: {
        ctor: Proxy,
        inst: new Proxy<Record<PropertyKey, unknown>>({}, {}),
    },
    RangeError: {
        ctor: RangeError,
        inst: new RangeError(),
    },
    ReferenceError: {
        ctor: ReferenceError,
        inst: new ReferenceError(),
    },
    RegExp: {
        ctor: RegExp,
        inst: new RegExp(""),
    },
    Set: {
        ctor: Set,
        inst: new Set<any>(),
    },
    SharedArrayBuffer: {
        ctor: SharedArrayBuffer,
        inst: new SharedArrayBuffer(0),
    },
    String: {
        ctor: String,
        inst: new String(""),
    },
    SyntaxError: {
        ctor: SyntaxError,
        inst: new SyntaxError(),
    },
    TypeError: {
        ctor: TypeError,
        inst: new TypeError(),
    },
    Uint8Array: {
        ctor: Uint8Array,
        inst: new Uint8Array(0),
    },
    Uint8ClampedArray: {
        ctor: Uint8ClampedArray,
        inst: new Uint8ClampedArray(0),
    },
    Uint16Array: {
        ctor: Uint16Array,
        inst: new Uint16Array(0),
    },
    Uint32Array: {
        ctor: Uint32Array,
        inst: new Uint32Array(0),
    },
    URIError: {
        ctor: URIError,
        inst: new URIError(),
    },
    WeakMap: {
        ctor: WeakMap,
        inst: new WeakMap(),
    },
    WeakSet: {
        ctor: WeakSet,
        inst: new WeakSet(),
    },
};

type BuiltinCtors = typeof builtinCtors;

export type BuiltinCtor = BuiltinCtors[keyof BuiltinCtors];
type GetCtorByName<T extends keyof BuiltinCtors> = BuiltinCtors[T]["ctor"];
type GetNameByCtor<T extends BuiltinCtor["ctor"]> = {
    [K in keyof BuiltinCtors]: BuiltinCtors[K]["ctor"] extends T ? K : never;
}[keyof BuiltinCtors];
type GetNameByInstance<T extends BuiltinCtor["inst"]> = {
    [K in keyof BuiltinCtors]: BuiltinCtors[K]["inst"] extends T ? K : never;
}[keyof BuiltinCtors];
type GetCtorByInstance<T extends BuiltinCtor["inst"]> = {
    [K in keyof BuiltinCtors]: BuiltinCtors[K]["inst"] extends T ? BuiltinCtors[K]["ctor"] : never;
}[keyof BuiltinCtors];

export function isBuiltinCtor(ctor: unknown): ctor is BuiltinCtor {
    const values = Object.values(builtinCtors).find((c) => c.ctor === ctor);
    return values !== undefined;
}

declare const error: unique symbol;
type TSError<T> = { [error]: T };

type Ctor = new (...args: any[]) => any;

type AsUniqueArray<A extends ReadonlyArray<any>, B extends ReadonlyArray<any>> = {
    [I in keyof A]: unknown extends {
        [J in keyof B]: J extends I ? never : B[J] extends A[I] ? unknown : never;
    }[number]
        ? TSError<"duplicate element">
        : A[I];
};

type OnlyMethods<T> = {
    [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

type OnlyProps<T> = {
    [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};

type NoInfer<A extends any> = [A][A extends any ? 0 : never];

export function ex<
    T extends BuiltinCtor["ctor"],
    I extends InstanceType<T>,
    Methods extends keyof OnlyMethods<I>,
    Props extends keyof OnlyProps<I>,
    A extends [] | (ReadonlyArray<Methods> & AsUniqueArray<A, A>),
    B extends [] | (ReadonlyArray<Props> & AsUniqueArray<B, B>),
>(constructor: T, mutatingMethods?: A, mutatingProperties?: NoInfer<B>) {
    return {
        constructor,
        mutatingMethods: mutatingMethods ?? [],
        mutatingProperties: mutatingProperties ?? [],
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
    T extends BuiltinCtor["ctor"],
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

type BuiltInInstances = BuiltinCtor["inst"];

type ExclusionMap<T extends BuiltinCtor["ctor"]> = Map<T, Exclusion<T>>;
type MutatingMethods<T> = RemoveEmptyArrayFromUnion<
    Exclusion<
        T extends BuiltinCtor["ctor"]
            ? T
            : GetCtorByInstance<T extends BuiltInInstances ? T : never>
    >["mutatingMethods"]
>;
type MutatingProperties<T extends BuiltinCtor["inst"]> = Exclusion<
    GetCtorByInstance<T>
>["mutatingProperties"];

type Immutable<T extends BuiltinCtor["inst"]> = Omit<T, keyof MutatingMethods<T>>;
type t = Immutable<[1, 2, 3]>;

const CTOR_MAP: ExclusionMap<BuiltinCtor["ctor"]> = new Map(
    exclusions.map((e) => [e.constructor, e]),
) as any;

function findExclusion<T extends BuiltinCtor["ctor"]>(ctor: T): Exclusion<T> | undefined {
    return CTOR_MAP.get(ctor) as Exclusion<T> | undefined;
}

export function findMutatingMethods<T extends BuiltinCtor["ctor"]>(ctor: T): MutatingMethods<T> {
    return (findExclusion(ctor) as any).mutatingMethods ?? [];
}

function immutable<T extends BuiltinCtor["inst"]>(x: T): Immutable<T> {
    return x as any;
}

export type Fn<T = any, A extends readonly any[] = any[]> = (...args: A) => T;


