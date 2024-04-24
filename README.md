# @travvy/immutable

`@travvy/immutable` is a utility library for TypeScript and JavaScript that provides a way to create deeply immutable objects. It uses the Proxy object to intercept and define custom behavior for fundamental operations (like setting and getting properties). This allows you to ensure that once an object is created, it cannot be changed.

> [!WARNING]  
> This project is a work in progress and is still very much a rough draft. Please do not use this in a production environment.

## Installation

> [!CAUTION]  
> None of this is valid yet as the package has not been published. If you want to try it out you can clone this repo.

You can install `@travvy/immutable` using npm (or bun or pnpm or yarn):

```bash
npm install @travvy/immutable
```

## Usage

First, import the `Immutable` function from the package:

```ts
import { Immutable } from "@travvy/immutable";
```

Then, you can use it to create an immutable object:

```ts
const obj = Immutable({ a: 1, b: { c: 2 } });
```

Now, `obj` is deeply immutable. You cannot change any of its properties:

```ts
obj.a = 2; // Error: Cannot set property `a` of immutable object
obj.b.c = 3; // Error: Cannot set property `c` of immutable object
```

You can also use it with arrays:

```ts
const arr = Immutable([1, 2, 3]);
arr[0] = 4; // Error: Cannot set property `0` of immutable object
```

And with functions:

```ts
const func = Immutable(() => {});
func.a = 1; // Error: Cannot set property `a` of immutable object
```

And even with built-in classes:

```ts
const date = Immutable(new Date());
date.setFullYear(2022); // Error: Cannot set property `setFullYear` of immutable object
```

## API

### `Immutable<T>(value: T): Immutable<T>`

This function takes a value and returns a new value that is deeply immutable. The returned value has the same shape as the input value, but all its properties are read-only.

The `Immutable<T>` type is a recursive type that makes all properties of `T` read-only. If `T` is a primitive type, it is returned as is. If `T` is a function, it is also returned as is, but any properties added to the function are made read-only.

## Limitations

This library uses the Proxy object, which is not available in all environments. It is not supported in Internet Explorer and requires a polyfill in older browsers.

Also, due to the limitations of TypeScript's type system, it is not possible to make certain objects, like instances of built-in classes (like Date or Map), deeply immutable. The properties of these objects can still be changed.

## Contributing

Contributions are welcome! Please open an issue if you find a bug or have a feature request. Pull requests are also welcome. Please make sure to add tests for any changes you make.

## License

`@travvy/immutable` is licensed under the MIT license. See the [LICENSE](LICENSE) file for more details.
