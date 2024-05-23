import {
    builtinCtors,
    exclusions,
    isBuiltinCtor,
    find,
    exclude,
    type BuiltinCtor,
} from "./exclusions";

export function immutable<C extends new (...args: any[]) => any>(
    ctor: C,
): ImmutableConstructor<ConstructorParameters<C>, InstanceType<C>> {
    return exclude(ctor);
}

type ImmutableConstructor<A extends readonly any[], T> = new (...args: A) => Immutable<T>;

type Immutable<T> = {
    readonly [K in keyof T]: T[K] extends object ? Immutable<T[K]> : T[K];
};

const Arr = immutable(Array);
const a = new Arr(1, 2, 3);
a[0] = 10;
console.log(a);
