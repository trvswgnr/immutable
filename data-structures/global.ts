import * as ds from ".";

declare global {
    type ImmutableArray<T> = ds.ImmutableArray<T>;
    var ImmutableArray: ds.ImmutableArrayConstructor;
    type ImmutableBigInt64Array = ds.ImmutableBigInt64Array;
    var ImmutableBigInt64Array: ds.ImmutableBigInt64ArrayConstructor;
}

for (const prop in ds) {
    // @ts-ignore
    globalThis[prop] = ds[prop];
}
