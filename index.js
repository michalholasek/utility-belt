import { isFunction, validate } from './lib/utils';

export function compose(...callbacks) {
  function composite(...args) {
    const initialValue = callbacks[callbacks.length - 1](...args);
    return callbacks.reduceRight((previousResult, callback) => {
      return callback(previousResult);
    }, initialValue);
  }

  const isValid = (callbacks.length !== 0 && validate(callbacks, isFunction));

  if (!isValid) {
    throw new Error('Supplied arguments are not functions.');
  }

  return composite;
}

export function concatAll(array) {
  if (!Array.isArray(array)) {
    throw new Error('Supplied argument is not an array.');
  }

  return array.reduce((result, current) => {
    if (!Array.isArray(current)) result.push(current);
    else result.push(...current);
    return result;
  }, []);
}

export function curry(fn) {
  function createCurry(...boundArgs) {
    return function boundFunction(...currentArgs) {
      const args = boundArgs.concat(currentArgs);
      return args.length < fn.length ? createCurry(...args) : fn(...args);
    };
  }

  if (!isFunction(fn)) {
    throw new Error('Supplied argument is not a function.');
  }

  return createCurry();
}

export function partial(fn, ...boundArgs) {
  function boundFunction(...args) {
    return fn(...boundArgs.concat(args));
  }

  if (!isFunction(fn)) {
    throw new Error('First argument is not a function.');
  }

  return boundFunction;
}

export function zip(left, right, combiner) {
  if (!Array.isArray(left) || !Array.isArray(right)) {
    throw new Error('First, second or both arguments are not an array.');
  }

  if (!isFunction(combiner)) {
    throw new Error('Combiner argument is not a function.');
  }

  const min = Math.min(left.length, right.length);

  let result = [];

  for (let index = 0; index < min; index++) {
    result.push(combiner(left[index], right[index]));
  }

  return result;
}
