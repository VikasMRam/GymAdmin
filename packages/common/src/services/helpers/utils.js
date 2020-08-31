export const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)],
    ),
  );

export const objectFilter = (obj, allowed = []) => Object.keys(obj)
  .filter(key => Array.isArray(allowed) ? allowed.includes(key) : allowed === key)
  .reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});

export const isString = str => typeof str === 'string' || str instanceof String;

export const isBoolean = val => typeof val === 'boolean';
