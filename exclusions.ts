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
type BuiltinCtors = typeof builtinCtors;

export type BuiltinCtor = BuiltinCtors[number];

export function isBuiltinCtor(ctor: any): ctor is BuiltinCtor {
    return builtinCtors.includes(ctor);
}

declare const error: unique symbol;

type TSError<T> = { [error]: T };

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

type H<T> = T extends Ctor
    ? {
          constructor: T;
          mutatingMethods: NoInfer<ReadonlyArray<keyof OnlyMethods<InstanceType<T>>>>;
          mutatingProperties: NoInfer<ReadonlyArray<keyof OnlyProps<InstanceType<T>>>>;
          staticCtorMethods: NoInfer<ReadonlyArray<keyof OnlyMethods<T>>>;
      }
    : never;

function h<
    T extends BuiltinCtor,
    Methods extends keyof OnlyMethods<InstanceType<T>>,
    SMethods extends keyof OnlyMethods<T>,
    Props extends keyof OnlyProps<InstanceType<T>>,
    A extends [] | (ReadonlyArray<Methods> & AsUniqueArray<A, A>),
    B extends [] | (ReadonlyArray<Props> & AsUniqueArray<B, B>),
    C extends [] | (ReadonlyArray<SMethods> & AsUniqueArray<C, C>),
>(
    constructor: T,
    mutatingMethods?: NoInfer<A>,
    mutatingProperties?: NoInfer<B>,
    staticCtorMethods?: NoInfer<C>,
): H<T> {
    return {
        constructor,
        mutatingMethods: mutatingMethods ?? [],
        mutatingProperties: mutatingProperties ?? [],
        staticCtorMethods: staticCtorMethods ?? [],
    } as any;
}

export const exclusions = [
    h(
        Array,
        ["push", "pop", "shift", "unshift", "splice", "sort", "reverse", "fill"],
        [],
        ["from", "fromAsync"],
    ),
    h(ArrayBuffer, ["resize"]),
    h(BigInt64Array, ["reverse", "sort", "fill"]),
    h(BigUint64Array, ["reverse", "sort", "fill"]),
    h(Boolean),
    h(DataView, [
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
    h(Date, [
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
    h(Error, [], ["cause", "message", "name", "stack"]),
    h(EvalError, [], ["cause", "message", "name", "stack"]),
    h(Float32Array, ["reverse", "sort", "fill"]),
    h(Float64Array, ["reverse", "sort", "fill"]),
    h(Function),
    h(Int8Array, ["reverse", "sort", "fill"]),
    h(Int16Array, ["reverse", "sort", "fill"]),
    h(Int32Array, ["reverse", "sort", "fill"]),
    h(Map, ["set", "delete", "clear"]),
    h(Number),
    h(Object, [], ["constructor"]),
    h(Promise),
    h(Proxy),
    h(RegExp),
    h(Set, ["add", "delete", "clear"]),
    h(SharedArrayBuffer, ["grow"]),
    h(String),
    h(SyntaxError, [], ["cause", "message", "name", "stack"]),
    h(TypeError, [], ["cause", "message", "name", "stack"]),
    h(Uint8Array, ["reverse", "sort", "fill"]),
    h(Uint8ClampedArray, ["reverse", "sort", "fill"]),
    h(Uint16Array, ["reverse", "sort", "fill"]),
    h(Uint32Array, ["reverse", "sort", "fill"]),
    h(URIError, [], ["cause", "message", "name", "stack"]),
    h(WeakMap, ["set", "delete"]),
    h(WeakSet, ["add", "delete"]),
] as const;

export function find<T extends BuiltinCtor>(ctor: T): H<T> | undefined {
    return exclusions.find((c) => c.constructor === ctor) as H<T> | undefined;
}
type Fn = (...args: any[]) => any;
type Ctor = new (...args: any[]) => any;
type ReadonlyIndexable<T> = {
    readonly [K in keyof T as K extends number ? K : never]: T[K];
};
type WithoutMutatingMethods<T extends Ctor> = {
    [K in keyof InstanceType<T> as K extends keyof Omit<
        InstanceType<T>,
        keyof H<T>["mutatingMethods"]
    >
        ? never
        : K extends number
        ? never
        : K]: InstanceType<T>[K];
} & ReadonlyIndexable<InstanceType<T>>;

export function exclude<C extends Ctor>(ctor: C): C {
    const ex = find(ctor);

    const c = class extends ctor {
        constructor(...args: any[]) {
            super(...args);

            for (const method of ex?.mutatingMethods ?? []) {
                this[method] = () => {
                    throw new Error(
                        `cannot call mutating method \`${String(method)}\` on immutable ${
                            ctor.name
                        }`,
                    );
                };
            }

            const obj = freezeAllBut(this, "length");
            if (!isIndexable(obj)) {
                return obj;
            }

            return new Proxy(obj, {
                set: (target, prop, value) => {
                    const numProp = Number(prop);
                    if (!isNaN(numProp)) {
                        throw new Error(
                            `index assignment not allowed on immutable ${ctor.name}`,
                        );
                    }
                    return Reflect.set(target, prop, value);
                },
            });
        }
    };

    return c;
}

function freezeAllBut<T, K extends (keyof T)[]>(obj: T, ...props: K): T {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    for (const prop in descriptors) {
        if (!props.includes(prop as keyof T)) {
            descriptors[prop].writable = false;
        }
    }
    return Object.defineProperties(obj, descriptors);
}

function isIndexable(obj: unknown): obj is { [index: number]: unknown } {
    return (
        Array.isArray(obj) ||
        ArrayBuffer.isView(obj) ||
        (typeof obj === "object" && obj !== null && !isNaN(parseInt(Object.keys(obj)[0], 10)))
    );
}
