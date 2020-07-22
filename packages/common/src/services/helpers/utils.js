export const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)],
    ),
  );

export const isString = str => typeof str === 'string' || str instanceof String;

export const isBoolean = val => typeof val === 'boolean';
