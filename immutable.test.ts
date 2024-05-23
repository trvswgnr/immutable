import { describe, it, expect } from "bun:test";
import { immutable } from "./immutable";

describe("immutable", () => {
    it("should create an immutable array", () => {
        const List = immutable(Array);
        expect(() => List.from([1, 2, 3])).not.toThrow();
        const li = List.from([1, 2, 3]);
        expect(() => li.push(4)).toThrowError();
        expect(() => (li[0] = 5)).toThrowError();
        expect(li.length).toBe(3);
    });

    it("should create an immutable Map", () => {
        const ImmutableMap = immutable(Map);
        expect(() => new ImmutableMap([["key1", "value1"]])).not.toThrow();
        const map = new ImmutableMap([["key1", "value1"]]);
        expect(() => map.set("key2", "value2")).toThrowError();
        expect(map.size).toBe(1);
    });

    it("should create an immutable Set", () => {
        const ImmutableSet = immutable(Set);
        expect(() => new ImmutableSet([1, 2, 3])).not.toThrow();
        const set = new ImmutableSet([1, 2, 3]);
        expect(() => set.add(4)).toThrowError();
        expect(set.size).toBe(3);
    });

    it("should create an immutable Date", () => {
        const ImmutableDate = immutable(Date);
        expect(() => new ImmutableDate("2020-01-01")).not.toThrow();
        const date = new ImmutableDate("2020-01-01");
        expect(() => date.setFullYear(2021)).toThrowError();
        expect(date.getFullYear()).toBe(2020);
    });

    it("should instantiate Array without error", () => {
        const List = immutable(Array);
        expect(() => new List()).not.toThrow();
    });

    it("should instantiate Map without error", () => {
        const ImmutableMap = immutable(Map);
        expect(() => new ImmutableMap()).not.toThrow();
    });

    it("should instantiate Set without error", () => {
        const ImmutableSet = immutable(Set);
        expect(() => new ImmutableSet()).not.toThrow();
    });

    it("should instantiate Date without error", () => {
        const ImmutableDate = immutable(Date);
        expect(() => new ImmutableDate()).not.toThrow();
    });

    it("should prevent mutating nested objects", () => {
        const ImmutableObject = immutable(Object);
        const obj = new ImmutableObject({ a: { b: 2 } });
        expect(Object.isFrozen(obj)).toBe(true);
        expect(() => (obj.a.b = 3)).toThrowError();
        expect(obj.a.b).toBe(2);
    });
});
