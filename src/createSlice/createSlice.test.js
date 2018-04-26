import chai from 'chai';
import createSlice from './createSlice';
import settable from '../properties/settable';
import { fromJS } from 'immutable';

chai.should();
// require('chai').should();

describe('createSlice()', () => {
  const slice = 'slice';
  it('createSlice reducer works as expected with single stateObject', () => {
    const key = 'exampleKey',
      initialState = 'initial';

    const { reducer } = createSlice(slice, [
      { key, initialState, properties: [settable] }
    ]);
    const state = reducer(fromJS({}), {
      type: `${slice}/${settable.type}`,
      key,
      value: 'coolValue'
    });
    state.get(key).should.equal('coolValue');
  });
});
