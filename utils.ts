export type Expect<T extends true> = T;
export type ExpectTrue<T extends true> = T;
export type ExpectFalse<T extends false> = T;
export type IsTrue<T extends true> = T;
export type IsFalse<T extends false> = T;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends 1 & T ? true : false;
export type NotAny<T> = true extends IsAny<T> ? false : true;

export type Debug<T> = { [K in keyof T]: T[K] };
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T;

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false;
export type ExpectValidArgs<
    FUNC extends (...args: any[]) => any,
    ARGS extends any[],
> = ARGS extends Parameters<FUNC> ? true : false;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
) => void
    ? I
    : never;

export type Tail<T extends any[]> = T extends [infer X, ...infer TailType] ? TailType : never;

type JoinRecursive<
    H extends string,
    T extends string[],
    Separator extends string,
> = Tail<T> extends [string, ...string[]]
    ? `${H}${Separator}${JoinRecursive<T[0], Tail<T>, Separator>}`
    : `${H}${Separator}${T[0]}`;

export type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R
    ? R
    : never;

export type Join<T extends string[], Separator extends string> = Tail<T> extends string[]
    ? JoinRecursive<T[0], Tail<T>, Separator>
    : T[0];

export type Push<T extends any[], V> = [...T, V];

export type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
    ? []
    : Push<TuplifyUnion<Exclude<T, L>>, L>;

export type Stringify<T> = T extends string | number | bigint | boolean | null | undefined
    ? `${T}`
    : never;

declare const error: unique symbol;
export type TSError<T> = { [error]: T };

type ArrStr<T> = T extends string[] ? T : never;

type HasSameKeysErrHelper<X, S extends string = ""> = TSError<`${Join<
    ArrStr<TuplifyUnion<X>>,
    ", "
>}${S}`>;

export type HasSameKeys<A, B> = keyof A extends keyof B
    ? keyof B extends keyof A
        ? true
        : HasSameKeysErrHelper<Exclude<keyof B, keyof A>, " missing from A">
    : HasSameKeysErrHelper<Exclude<keyof A, keyof B>, " missing from B">;

export type IsUniqueArray<T extends any[], Acc extends any[] = []> = T extends [
    infer H,
    ...infer Tail,
]
    ? H extends Acc[number]
        ? false
        : IsUniqueArray<Tail, [...Acc, H]>
    : true;

type ToArr<T> = T extends any[] ? T : T[] extends T ? never : T[];

export type UniqueArray<T> = T extends any[]
    ? IsUniqueArray<T> extends true
        ? T
        : never
    : UniqueArray<ToArr<T>>;

export type Constructor<T = any, A extends readonly any[] = any[]> = new (...args: A) => T;

export enum Ordering {
    Less = -1,
    Equal = 0,
    Greater = 1,
}

export function isConstructor(func: unknown): func is Constructor<unknown> {
    return (
        typeof func === "function" &&
        func.prototype &&
        Object.getOwnPropertyNames(func.prototype).length > 1
    );
}
