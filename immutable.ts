type Primitive = null | undefined | boolean | number | bigint | string | symbol;

type AnyFn = (...args: any[]) => any;

export type Immutable<T> = T extends Primitive
    ? T
    : {
          readonly [P in keyof T]: T[P] extends object
              ? T[P] extends AnyFn
                  ? T[P]
                  : Immutable<T[P]>
              : T[P];
      };

export function Immutable<T>(value: T): Immutable<T> {
    if ((typeof value !== "object" || value === null) && typeof value !== "function") {
        return value as Immutable<T>;
    }

    const proxy = new Proxy(value, {
        get(target, name) {
            const commonUpdaterNames = [
                "add",
                "delete",
                "clear",
                "set",
                "append",
                "prepend",
                "push",
                "pop",
                "shift",
                "unshift",
                "splice",
                "sort",
                "reverse",
                "fill",
                "setFullYear",
                "setHours",
                "setMinutes",
                "setSeconds",
                "setMilliseconds",
            ];
            if (commonUpdaterNames.includes(name as string)) {
                throw new Error(
                    `Cannot call '${String(name)}' because it would modify immutable object.`,
                );
            }
            if (!(name in target)) {
                return undefined;
            }
            const value = target[name as keyof T];
            if (typeof value !== "function") {
                return Immutable(value);
            }
            return Immutable(value.bind(target));
        },
        set(_, prop) {
            throw new Error(
                `Cannot assign to '${String(prop)}' because it is a read-only property.`,
            );
        },
    });

    return proxy as Immutable<T>;
}
