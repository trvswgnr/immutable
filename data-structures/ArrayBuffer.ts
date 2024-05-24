export interface ImmutableArrayBuffer {
    readonly [Symbol.toStringTag]: string;

    /**
     * Read-only. The length of the ImmutableArrayBuffer (in bytes).
     */
    readonly byteLength: number;

    /**
     * Returns a section of an ImmutableArrayBuffer.
     */
    slice(begin: number, end?: number): ImmutableArrayBuffer;
}

export interface ImmutableArrayBufferConstructor {
    readonly [Symbol.species]: ImmutableArrayBufferConstructor;
    prototype: ImmutableArrayBuffer;
    new (byteLength: number): ImmutableArrayBuffer;
    new (byteLength: number, options: { maxByteLength?: number }): ImmutableArrayBuffer;
    isView(arg: any): arg is ArrayBufferView;
}

export const ImmutableArrayBuffer: ImmutableArrayBufferConstructor = ArrayBuffer;
