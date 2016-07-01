import { expect } from 'chai';

import { compose } from '../../index';

describe('compose', () => {

  it('should return a function', () => {
    const actual = typeof compose(() => {}, () => {});
    const expected = 'function';

    expect(actual).to.equal(expected);
  });

  it('should throw an error if any of the supplied arguments is not a function (1)', () => {
    const actual = () => { compose(); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('Supplied arguments are not functions.');
  });

  it('should throw an error if any of the supplied arguments is not a function (2)', () => {
    const actual = () => { compose('String.'); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('Supplied arguments are not functions.');
  });

  it('should throw an error if any of the supplied arguments is not a function (3)', () => {
    const actual = () => { compose(123); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('Supplied arguments are not functions.');
  });

  it('should throw an error if any of the supplied arguments is not a function (4)', () => {
    const actual = () => { compose(() => {}, 'String.', () => {}); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('Supplied arguments are not functions.');
  });

  it('should throw an error if any of the supplied arguments is not a function (5)', () => {
    const actual = () => { compose('String.', () => {}, 123, () => {}, 567); };

    expect(actual).to.throw(Error);
    expect(actual).to.throw('Supplied arguments are not functions.');
  });

  it('should work with a single function', () => {
    const actual = compose(arg => arg);
    const expected = 'ECMAScript 2015';

    expect(actual('ECMAScript 2015')).to.equal(expected);
  });

  it('should invoke every function on the given value', () => {
    const actual = compose(
      (arg) => { return [arg, '!'].join(''); },
      (arg) => { return arg.toString(); }
    );
    const expected = '1!';

    expect(actual(1)).to.equal(expected);
  });

});
