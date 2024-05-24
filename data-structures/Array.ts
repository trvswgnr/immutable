import { ex, type RemoveEmptyArrayFromUnion } from "../exclusions";
import type { Alike, ExpectTrue } from "../utils";

const exclusion = ex(Array, [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
    "fill",
]);

const mutatingMethods = exclusion.mutatingMethods;

class _ImmutableArray<T> extends Array<T> {
    constructor(...args: any[]) {
        super(...args);
        for (const method of mutatingMethods) {
            this[method] = undefined as any;
        }
        return new Proxy(this, {
            set: (target, prop, value) => {
                if (prop !== "length") {
                    throw new Error(`cannot assign to ${String(prop)} on ImmutableArray`);
                }
                return Reflect.set(target, prop, value);
            },
        });
    }
}

interface ImmutableArray<T> extends RelativeIndexable<T> {
    readonly [n: number]: T;

    /**
     * Gets the length of the array. This is a number one higher than the highest element defined in an array.
     */
    readonly length: number;
    /**
     * Returns a string representation of an array.
     */
    toString(): string;
    /**
     * Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.
     */
    toLocaleString(): string;
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat(...items: ConcatArray<T>[]): ImmutableArray<T>;
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat(...items: (T | ConcatArray<T>)[]): ImmutableArray<T>;
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
     */
    join(separator?: string): string;
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    slice(start?: number, end?: number): ImmutableArray<T>;
    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    indexOf(searchElement: T, fromIndex?: number): number;
    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every<S extends T>(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => value is S,
        thisArg?: any,
    ): this is ImmutableArray<S>;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => unknown,
        thisArg?: any,
    ): boolean;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param predicate A function that accepts up to three arguments. The some method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    some(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => unknown,
        thisArg?: any,
    ): boolean;
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(
        callbackfn: (value: T, index: number, array: ImmutableArray<T>) => void,
        thisArg?: any,
    ): void;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map<U>(
        callbackfn: (value: T, index: number, array: ImmutableArray<T>) => U,
        thisArg?: any,
    ): ImmutableArray<U>;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     */
    filter<S extends T>(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => value is S,
        thisArg?: any,
    ): ImmutableArray<S>;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => unknown,
        thisArg?: any,
    ): ImmutableArray<T>;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce(
        callbackfn: (
            previousValue: T,
            currentValue: T,
            currentIndex: number,
            array: ImmutableArray<T>,
        ) => T,
    ): T;
    reduce(
        callbackfn: (
            previousValue: T,
            currentValue: T,
            currentIndex: number,
            array: ImmutableArray<T>,
        ) => T,
        initialValue: T,
    ): T;
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce<U>(
        callbackfn: (
            previousValue: U,
            currentValue: T,
            currentIndex: number,
            array: ImmutableArray<T>,
        ) => U,
        initialValue: U,
    ): U;
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight(
        callbackfn: (
            previousValue: T,
            currentValue: T,
            currentIndex: number,
            array: ImmutableArray<T>,
        ) => T,
    ): T;
    reduceRight(
        callbackfn: (
            previousValue: T,
            currentValue: T,
            currentIndex: number,
            array: ImmutableArray<T>,
        ) => T,
        initialValue: T,
    ): T;
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight<U>(
        callbackfn: (
            previousValue: U,
            currentValue: T,
            currentIndex: number,
            array: ImmutableArray<T>,
        ) => U,
        initialValue: U,
    ): U;

    /**
     * Returns the value of the last element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate findLast calls predicate once for each element of the array, in descending
     * order, until it finds one where predicate returns true. If such an element is found, findLast
     * immediately returns that element value. Otherwise, findLast returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findLast<S extends T>(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => value is S,
        thisArg?: any,
    ): S | undefined;
    findLast(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => unknown,
        thisArg?: any,
    ): T | undefined;

    /**
     * Returns the index of the last element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate findLastIndex calls predicate once for each element of the array, in descending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findLastIndex(
        predicate: (value: T, index: number, array: ImmutableArray<T>) => unknown,
        thisArg?: any,
    ): number;

    /**
     * Copies the array and returns the copied array with all of its elements reversed.
     */
    toReversed(): ImmutableArray<T>;

    /**
     * Copies and sorts the array.
     * @param compareFn Function used to determine the order of the elements. It is expected to return
     * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
     * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
     * ```ts
     * [11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
     * ```
     */
    toSorted(compareFn?: (a: T, b: T) => number): ImmutableArray<T>;

    /**
     * Copies an array and removes elements while, if necessary, inserting new elements in their place, returning the remaining elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the copied array in place of the deleted elements.
     * @returns A copy of the original array with the remaining elements.
     */
    toSpliced(start: number, deleteCount: number, ...items: T[]): ImmutableArray<T>;

    /**
     * Copies an array and removes elements while returning the remaining elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @returns A copy of the original array with the remaining elements.
     */
    toSpliced(start: number, deleteCount?: number): ImmutableArray<T>;

    /**
     * Copies an array, then overwrites the value at the provided index with the
     * given value. If the index is negative, then it replaces from the end
     * of the array
     * @param index The index of the value to overwrite. If the index is
     * negative, then it replaces from the end of the array.
     * @param value The value to insert into the copied array.
     * @returns A copy of the original array with the inserted value.
     */
    with(index: number, value: T): ImmutableArray<T>;

    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
     */
    at(index: number): T | undefined;

    /**
     * Calls a defined callback function on each element of an array. Then, flattens the result into
     * a new array.
     * This is identical to a map followed by flat with depth 1.
     *
     * @param callback A function that accepts up to three arguments. The flatMap method calls the
     * callback function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callback function. If
     * thisArg is omitted, undefined is used as the this value.
     */
    flatMap<U, This = undefined>(
        callback: (
            this: This,
            value: T,
            index: number,
            array: ImmutableArray<T>,
        ) => U | ReadonlyArray<U>,
        thisArg?: This,
    ): ImmutableArray<U>;

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<A, D extends number = 1>(this: A, depth?: D): ImmutableArray<FlatArray<A, D>>;

    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;

    /**
     * Is an object whose properties have the value 'true'
     * when they will be absent when used in a 'with' statement.
     */
    readonly [Symbol.unscopables]: {
        [K in keyof ImmutableArray<any>]?: boolean;
    };

    /** Iterator of values in the array. */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): IterableIterator<[number, T]>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an iterable of values in the array
     */
    values(): IterableIterator<T>;

    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find<S extends T>(
        predicate: (value: T, index: number, obj: ImmutableArray<T>) => value is S,
        thisArg?: any,
    ): S | undefined;
    find(
        predicate: (value: T, index: number, obj: ImmutableArray<T>) => unknown,
        thisArg?: any,
    ): T | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex(
        predicate: (value: T, index: number, obj: ImmutableArray<T>) => unknown,
        thisArg?: any,
    ): number;
}


export interface ImmutableArrayConstructor {
    prototype: ImmutableArray<any>;
    isArray(arg: any): arg is ImmutableArray<any>;
    from<T>(arrayLike: ArrayLike<T>): ImmutableArray<T>;
    from<T, U>(
        arrayLike: ArrayLike<T>,
        mapfn: (v: T, k: number) => U,
        thisArg?: any,
    ): ImmutableArray<U>;
    from<T>(iterable: Iterable<T> | ArrayLike<T>): ImmutableArray<T>;
    from<T, U>(
        iterable: Iterable<T> | ArrayLike<T>,
        mapfn: (v: T, k: number) => U,
        thisArg?: any,
    ): ImmutableArray<U>;
    from(iterable: unknown, mapfn?: unknown, thisArg?: unknown): ImmutableArray<unknown>;
    of<T>(...items: T[]): ImmutableArray<T>;
    fromAsync<T>(
        arrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
    ): Promise<Awaited<ImmutableArray<T>>>;
    fromAsync<T, U>(
        arrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
        mapFn?: ((value: T, index: number) => U) | undefined,
        thisArg?: any,
    ): Promise<Awaited<ImmutableArray<U>>>;
    fromAsync(
        arrayLike: unknown,
        mapFn?: unknown,
        thisArg?: unknown,
    ): Promise<Awaited<ImmutableArray<unknown>>> | Promise<Awaited<ImmutableArray<unknown>>>;
    [Symbol.species]: ImmutableArrayConstructor;
}

export const ImmutableArray: ImmutableArrayConstructor = _ImmutableArray;

const x = ImmutableArray.from([1, 2, 3]);
const y = x.map((x) => x + 1);
console.log(x, y);
