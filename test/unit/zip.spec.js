import { expect } from 'chai';

import { zip } from '../../index';

describe('zip', () => {

  it('should return an array', () => {
    const expected = zip([1], [2], (left, right) => left + right);

    expect(Array.isArray([])).to.equal(Array.isArray(expected));
  });

  it('should throw an error if first argument is not an array', () => {
    expect(() => zip(undefined)).to.throw(Error);
    expect(() => zip(undefined)).to.throw('First, second or both arguments are not an array.');
  });

  it('should throw an error if second argument is not an array', () => {
    expect(() => zip([], undefined)).to.throw(Error);
    expect(() => zip([], undefined)).to.throw('First, second or both arguments are not an array.');
  });

  it('should throw an error if combiner argument is not a function', () => {
    expect(() => zip([], [], undefined)).to.throw(Error);
    expect(() => zip([], [], undefined)).to.throw('Combiner argument is not a function.');
  });

  it('should combine empty array arguments into empty array', () => {
    const combiner = (left, right) => left + right;
    const actual = zip([], [], combiner);
    const expected = [];

    expect(actual).to.deep.equal(expected);
  });

  it('should combine given array arguments into single array (1)', () => {
    const combiner = (left, right) => left + right;
    const actual = zip([1, 2, 3], [1, 2, 3], combiner);
    const expected = [2, 4, 6];

    expect(actual).to.deep.equal(expected);
  });

  it('should combine given array arguments into single array (2)', () => {
    const combiner = (left, right) => ({ id: left, value: right});
    const actual = zip([1, 2, 3], ['Value 1', 'Value 2', 'Value 3'], combiner);
    const expected = [{ id: 1, value: 'Value 1' }, { id: 2, value: 'Value 2' }, { id: 3, value: 'Value 3' }];

    expect(actual).to.deep.equal(expected);
  });

  it('should combine given array arguments into single array (3)', () => {
    const combiner = (left, right) => ([left, right]);
    const actual = zip([1, 2, 3], ['Value 1', 'Value 2', 'Value 3'], combiner);
    const expected = [[1, 'Value 1'], [2, 'Value 2'], [3, 'Value 3']];

    expect(actual).to.deep.equal(expected);
  });

});
