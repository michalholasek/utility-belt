import { expect } from 'chai';

import { partial } from '../../index';

describe('partial', () => {

  it('should return a function', () => {
    const actual = typeof partial(() => {});
    const expected = 'function';

    expect(actual).to.equal(expected);
  });

  it('should throw an error if first argument is not a function (1)', () => {
    const actual = () => { partial(); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('First argument is not a function.');
  });

  it('should throw an error if first argument is not a function (2)', () => {
    const actual = () => { partial('String.'); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('First argument is not a function.');
  });

  it('should throw an error if first argument is not a function (3)', () => {
    const actual = () => { partial(123); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('First argument is not a function.');
  });

  it('should return proper result for given input (1)', () => {
    const callback = (a, b, c) => { return a + b + c; };

    expect(partial(callback, 1, 2)(3)).to.equal(6);
  });

  it('should return proper result for given input (2)', () => {
    const callback = (a, b, c) => { return [a, b, c].join(''); };

    expect(partial(callback, 'Abc')('d', 'e')).to.equal('Abcde');
  });

  it('should return proper result for given input (3)', () => {
    const callback = (fn, a, b) => { return fn(a, b); };

    expect(partial(callback, (a, b) => { return a + b; })(3, 3)).to.equal(6);
  });

});
