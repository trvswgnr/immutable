import type { Ordering } from "../utils";

export interface ImmutableBigUint64Array extends RelativeIndexable<bigint> {
    /** The length of the array. */
    readonly length: number;

    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    /** The ArrayBuffer instance referenced by the array. */
    readonly buffer: ArrayBufferLike;

    /** The length in bytes of the array. */
    readonly byteLength: number;

    /** The offset in bytes of the array. */
    readonly byteOffset: number;

    [Symbol.iterator](): IterableIterator<bigint>;

    readonly [Symbol.toStringTag]: string;

    readonly [index: number]: bigint;

    /** Yields index, value pairs for every entry in the array. */
    entries(): IterableIterator<[number, bigint]>;

    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns false,
     * or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every<This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => boolean,
        thisArg?: This,
    ): boolean;

    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls
     * the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    filter<This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => boolean,
        thisArg?: This,
    ): ImmutableBigUint64Array;

    /**
     * Returns the value of the first element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found, find
     * immediately returns that element value. Otherwise, find returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    find<This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => boolean,
        thisArg?: This,
    ): bigint | undefined;

    /**
     * Returns the index of the first element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate find calls predicate once for each element of the array, in ascending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findIndex<This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => boolean,
        thisArg?: This,
    ): number;

    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn A function that accepts up to three arguments. forEach calls the
     * callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    forEach<This = undefined>(
        callbackfn: (value: bigint, index: number, array: ImmutableBigUint64Array) => void,
        thisArg?: This,
    ): void;

    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: bigint, fromIndex?: number): boolean;

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
     * search starts at index 0.
     */
    indexOf(searchElement: bigint, fromIndex?: number): number;

    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the
     * resulting String. If omitted, the array elements are separated with a comma.
     */
    join(separator?: string): string;

    /** Yields each index in the array. */
    keys(): IterableIterator<number>;

    /**
     * Returns the index of the last occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
     * search starts at index 0.
     */
    lastIndexOf(searchElement: bigint, fromIndex?: number): number;

    /**
     * Calls a defined callback function on each element of an array, and returns an array that
     * contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the
     * callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    map<This = undefined>(
        callbackfn: (value: bigint, index: number, array: ImmutableBigUint64Array) => bigint,
        thisArg?: This,
    ): ImmutableBigUint64Array;

    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
     * callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduce(
        callbackfn: (
            previousValue: bigint,
            currentValue: bigint,
            currentIndex: number,
            array: ImmutableBigUint64Array,
        ) => bigint,
    ): bigint;

    /**
     * Calls the specified callback function for all the elements in an array. The return value of
     * the callback function is the accumulated result, and is provided as an argument in the next
     * call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
     * callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduce<U>(
        callbackfn: (
            previousValue: U,
            currentValue: bigint,
            currentIndex: number,
            array: ImmutableBigUint64Array,
        ) => U,
        initialValue: U,
    ): U;

    /**
     * Calls the specified callback function for all the elements in an array, in descending order.
     * The return value of the callback function is the accumulated result, and is provided as an
     * argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
     * the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an
     * argument instead of an array value.
     */
    reduceRight(
        callbackfn: (
            previousValue: bigint,
            currentValue: bigint,
            currentIndex: number,
            array: ImmutableBigUint64Array,
        ) => bigint,
    ): bigint;

    /**
     * Calls the specified callback function for all the elements in an array, in descending order.
     * The return value of the callback function is the accumulated result, and is provided as an
     * argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
     * the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start
     * the accumulation. The first call to the callbackfn function provides this value as an argument
     * instead of an array value.
     */
    reduceRight<U>(
        callbackfn: (
            previousValue: U,
            currentValue: bigint,
            currentIndex: number,
            array: ImmutableBigUint64Array,
        ) => U,
        initialValue: U,
    ): U;

    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    slice(start?: number, end?: number): ImmutableBigUint64Array;

    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param predicate A function that accepts up to three arguments. The some method calls the
     * predicate function for each element in the array until the predicate returns true, or until
     * the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    some<This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => boolean,
        thisArg?: This,
    ): boolean;

    /**
     * Gets a new ImmutableBigUint64Array view of the ArrayBuffer store for this array, referencing the elements
     * at begin, inclusive, up to end, exclusive.
     * @param begin The index of the beginning of the array.
     * @param end The index of the end of the array.
     */
    subarray(begin?: number, end?: number): ImmutableBigUint64Array;

    /** Converts the array to a string by using the current locale. */
    toLocaleString(): string;

    /** Returns a string representation of the array. */
    toString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): ImmutableBigUint64Array;

    /** Yields each value in the array. */
    values(): IterableIterator<bigint>;

    /**
     * Returns the value of the last element in the array where predicate is true, and undefined
     * otherwise.
     * @param predicate findLast calls predicate once for each element of the array, in descending
     * order, until it finds one where predicate returns true. If such an element is found, findLast
     * immediately returns that element value. Otherwise, findLast returns undefined.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findLast<S extends bigint, This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => value is S,
        thisArg?: This,
    ): S | undefined;
    findLast<This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => unknown,
        thisArg?: This,
    ): bigint | undefined;

    /**
     * Returns the index of the last element in the array where predicate is true, and -1
     * otherwise.
     * @param predicate findLastIndex calls predicate once for each element of the array, in descending
     * order, until it finds one where predicate returns true. If such an element is found,
     * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
     * @param thisArg If provided, it will be used as the this value for each invocation of
     * predicate. If it is not provided, undefined is used instead.
     */
    findLastIndex<This = undefined>(
        predicate: (value: bigint, index: number, array: ImmutableBigUint64Array) => unknown,
        thisArg?: This,
    ): number;

    /**
     * Copies the array and returns the copy with the elements in reverse order.
     */
    toReversed(): ImmutableBigUint64Array;

    /**
     * Copies and sorts the array.
     * @param compareFn Function used to determine the order of the elements. It is expected to return
     * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
     * value otherwise. If omitted, the elements are sorted in ascending order.
     * ```ts
     * const myNums = ImmutableBigUint64Array.from([11n, 2n, -22n, 1n]);
     * myNums.toSorted((a, b) => Number(a - b)) // ImmutableBigUint64Array(4) [-22n, 1n, 2n, 11n]
     * ```
     */
    toSorted(compareFn?: (a: bigint, b: bigint) => Ordering): ImmutableBigUint64Array;

    /**
     * Copies the array and inserts the given bigint at the provided index.
     * @param index The index of the value to overwrite. If the index is
     * negative, then it replaces from the end of the array.
     * @param value The value to insert into the copied array.
     * @returns A copy of the original array with the inserted value.
     */
    with(index: number, value: bigint): ImmutableBigUint64Array;

    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
     */
    at(index: number): bigint | undefined;
}

export interface ImmutableBigUint64ArrayConstructor {
    readonly prototype: ImmutableBigUint64Array;

    new (length?: number): ImmutableBigUint64Array;
    new (array: Iterable<bigint>): ImmutableBigUint64Array;
    new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): ImmutableBigUint64Array;

    /** The size in bytes of each element in the array. */
    readonly BYTES_PER_ELEMENT: number;

    /**
     * Returns a new array from a set of elements.
     * @param items A set of elements to include in the new array object.
     */
    of(...items: bigint[]): ImmutableBigUint64Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: ArrayLike<bigint>): ImmutableBigUint64Array;
    from<U, This = undefined>(
        arrayLike: ArrayLike<U>,
        mapfn: (v: U, k: number) => bigint,
        thisArg?: This,
    ): ImmutableBigUint64Array;
}

export const ImmutableBigUint64Array: ImmutableBigUint64ArrayConstructor = BigUint64Array as any;
