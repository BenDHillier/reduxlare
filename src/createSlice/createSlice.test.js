import chai from 'chai';
import createSlice from './createSlice';

chai.should();
// require('chai').should();

describe('createSlice()', () =>
  it(`should return an object containing keys called reducer, selectors and dispathers`, () => {
    const result = createSlice('slice', []);
    result.reducer.should.be.a('function');
  }));
