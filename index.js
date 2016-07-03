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
