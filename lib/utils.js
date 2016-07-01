export const isFunction = (value) => {
  return typeof value === 'function';
};

// Validates args over the course of all validators passed
export const validate = (args, ...validators) => {
  const results = args.map((arg) => {
    return validators.every((validator) => validator(arg));
  });

  return results.every((result) => result);
};
