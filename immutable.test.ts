import { describe, it, expect } from "bun:test";
import { Immutable } from "./immutable.ts";

describe("Immutable", () => {
    it("should return the same value for primitive types", () => {
        expect(Immutable(null)).toBe(null);
        expect(Immutable(undefined)).toBe(undefined);
        expect(Immutable(true)).toBe(true);
        expect(Immutable(123)).toBe(123);
        expect(Immutable("test")).toBe("test");
        expect(Immutable(Symbol.for("test"))).toBe(Symbol.for("test"));
        expect(Immutable(BigInt(123))).toBe(BigInt(123));
    });

    it("should return an immutable object for non-primitive types", () => {
        const obj = { a: 1, b: { c: 2 } };
        const immutableObj = Immutable(obj);

        expect(immutableObj).not.toBe(obj);
        expect(immutableObj.a).toBe(1);
        expect(immutableObj.b).not.toBe(obj.b);
        expect(immutableObj.b.c).toBe(2);
    });

    it("should not allow properties to be set", () => {
        const obj = { a: 1 };
        const immutableObj = Immutable(obj);

        expect(() => {
            // @ts-expect-error - assign to a read-only property should error
            immutableObj.a = 2;
        }).toThrowError(new Error("Cannot assign to 'a' because it is a read-only property."));
    });

    it("should return bound functions", () => {
        const obj = {
            a: 1,
            b() {
                return this.a;
            },
        };
        const immutableObj = Immutable(obj);

        expect(immutableObj.b()).toBe(1);
    });

    it("should return immutable objects within objects", () => {
        const obj = {
            a: 1,
            b: {
                c: 2,
            },
        };
        const immutableObj = Immutable(obj);

        expect(immutableObj.b).not.toBe(obj.b);
        expect(immutableObj.b.c).toBe(2);
    });

    it("should return immutable arrays", () => {
        const arr = [1, 2, 3];
        const immutableArr = Immutable(arr);

        expect(immutableArr).not.toBe(arr);
        expect([...immutableArr]).toEqual(arr);
        expect(() => {
            // @ts-expect-error - assign to a read-only property should error
            immutableArr[0] = 4;
        }).toThrowError(new Error("Cannot assign to '0' because it is a read-only property."));
        expect(immutableArr[0]).toBe(1);
        expect(immutableArr[1]).toBe(2);
        expect(immutableArr[2]).toBe(3);
        expect(immutableArr.length).toBe(3);
    });

    it("should return immutable sets", () => {
        const set = new Set([1, 2, 3]);
        const immutableSet = Immutable(set);

        expect(immutableSet).not.toBe(set);
        expect([...immutableSet]).toEqual([1, 2, 3]);
        expect(() => {
            immutableSet.add(4);
        }).toThrowError(new Error("Cannot call 'add' because it would modify immutable object."));
        expect(immutableSet.has(1)).toBe(true);
        expect(immutableSet.has(2)).toBe(true);
        expect(immutableSet.has(3)).toBe(true);
        expect(immutableSet.size).toBe(3);
    });

    it("should work with Date objects", () => {
        const date = new Date();
        const immutableDate = Immutable(date);
        expect(immutableDate).toBeInstanceOf(Date);
        expect(immutableDate).not.toBe(date);
        expect(immutableDate.getTime()).toBe(date.getTime());
    });

    it("should work with RegExp objects", () => {
        const regexp = /test/;
        const immutableRegexp = Immutable(regexp);
        expect(immutableRegexp).toBeInstanceOf(RegExp);
        expect(immutableRegexp).not.toBe(regexp);
        expect(immutableRegexp.source).toBe(regexp.source);
    });
});
