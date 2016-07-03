export function isFunction(value) {
  return typeof value === 'function';
};

// Validates args over the course of all validators passed
export function validate(args, ...validators) {
  const results = args.map((arg) => {
    return validators.every((validator) => validator(arg));
  });

  return results.every((result) => result);
};
