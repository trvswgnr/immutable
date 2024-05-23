function immutable<T extends new (...args: any[]) => any>(Constructor: T): T {
    function deepFreeze(obj: any): any {
        if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
            Object.getOwnPropertyNames(obj).forEach(prop => {
                const value = obj[prop];
                if (typeof value === 'object' && value !== null) {
                    deepFreeze(value);
                }
            });
            Object.freeze(obj);
        }
        return obj;
    }

    const instanceHandler = {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);
            if (typeof value === 'object' && value !== null) {
                return new Proxy(value, instanceHandler);
            }
            return value;
        },
        set() {
            throw new Error('Cannot mutate immutable object');
        },
        deleteProperty() {
            throw new Error('Cannot mutate immutable object');
        },
        defineProperty() {
            throw new Error('Cannot mutate immutable object');
        },
        setPrototypeOf() {
            throw new Error('Cannot mutate immutable object');
        }
    };

    return new Proxy(Constructor, {
        construct(target, args) {
            const instance = new target(...args);

            if (Array.isArray(instance)) {
                instance.forEach(item => deepFreeze(item));
                deepFreeze(instance);
            } else if (instance instanceof Map || instance instanceof Set) {
                instance.forEach(item => deepFreeze(item));
                deepFreeze(instance);
            } else if (instance instanceof Date) {
                Object.freeze(instance);
            } else {
                deepFreeze(instance);
            }

            return new Proxy(instance, instanceHandler);
        }
    }) as T;
}

export { immutable };
