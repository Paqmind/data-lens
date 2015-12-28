# JavaScript data lens

Port of [Laiff/data.lens](https://github.com/Laiff/data.lens) great library.
Immutable lenses over native JS data.

## Differences:

1. ES6 syntax 
2. Returns `undefined` for missed keys instead of throwing
3. Can create nested structure at once
4. Tests!

## Usage

```js
import Lens from "paqmind.data-lens";

let lens = Lens("username");
console.log(lens.get({}));                         // undefined
console.log(lens.get({username: "john"}));         // "john"
console.log(lens.set({username: "john"}, "jack")); // {username: "jack"}
```

## Rules

### Reads

1. Returns undefined for 1 missed key
2. Throws for 2+ missed keys

### Writes

1. Throws for operations that can't be performed (setting keys to `Number` and `String` types)
2. Creates desired structure in other cases (mkdirp)

