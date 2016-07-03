import { isFunction, validate } from './lib/utils';

export const compose = (...callbacks) => {
  const composite = (...args) => {
    const initialValue = callbacks[callbacks.length - 1](...args);
    return callbacks.reduceRight((previousResult, callback) => {
      return callback(previousResult);
    }, initialValue);
  };

  const isValid = (callbacks.length !== 0 && validate(callbacks, isFunction));

  if (!isValid) {
    throw new Error('Supplied arguments are not functions.');
  }

  return composite;
};

export const curry = (fn) => {
  const createCurry = (...boundArgs) => {
    return (...currentArgs) => {
      const args = boundArgs.concat(currentArgs);
      return args.length < fn.length ? createCurry(...args) : fn(...args);
    };
  };

  if (!isFunction(fn)) {
    throw new Error('Supplied argument is not a function.');
  }

  return createCurry();
};

export const partial = (fn, ...boundArgs) => {
  const boundFunction = (...args) => {
    return fn(...boundArgs.concat(args));
  };

  if (!isFunction(fn)) {
    throw new Error('First argument is not a function.');
  }

  return boundFunction;
};
