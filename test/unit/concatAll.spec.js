import { expect } from 'chai';

import { concatAll } from '../../index';

describe('concatAll', () => {

  it('should return an array', () => {
    const expected = concatAll([[1], [2], [3]]);

    expect(Array.isArray([])).to.equal(Array.isArray(expected));
  });

  it('should return empty array for empty array argument', () => {
    expect([]).to.deep.equal(concatAll([]));
  });

  it('should throw an error if given argument is not an array', () => {
    expect(() => concatAll(undefined)).to.throw(Error);
    expect(() => concatAll(undefined)).to.throw('Supplied argument is not an array.');
  });

  it('should flatten given array (1)', () => {
    const actual = concatAll([[1], [2], [3]]);
    const expected = [1, 2, 3];

    expect(actual).to.deep.equal(expected);
  });

  it('should flatten given array (2)', () => {
    const actual = concatAll([1, [2], 3]);
    const expected = [1, 2, 3];

    expect(actual).to.deep.equal(expected);
  });

  it('should flatten given array (3)', () => {
    const actual = concatAll([undefined, [{ id: 1 }], [...[1, 2, 3]]]);
    const expected = [undefined, { id: 1 }, 1, 2, 3];

    expect(actual).to.deep.equal(expected);
  });

});
