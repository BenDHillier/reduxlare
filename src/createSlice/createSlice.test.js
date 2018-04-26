import chai from 'chai';
import createSlice from './createSlice';
import settable from '../properties/settable';
import { fromJS } from 'immutable';

chai.should();
// require('chai').should();

describe('createSlice()', () => {
  const slice = 'slice';
  const key = 'exampleKey',
    initialState = 'initial',
    key1 = 'exampleKey1',
    initialState1 = 'initial1';

  // it('reducer returns expected initialState', () => {
  //   const { reducer } = createSlice(slice, [
  //     { key, initialState, properties: [settable] },
  //     { key1, initialState1, properties: [settable] }
  //   ]);
  //   const returnedInitialState = reducer(undefined, { type: 'NO_MATCHES' });
  //   returnedInitialState.get(key).should.equal(initialState);
  //   returnedInitialState.get(key1).should.equal(initialState1);
  // });
  //
  // it('createSlice reducer works as expected with multiple stateObject', () => {
  //   const { reducer } = createSlice(slice, [
  //     { key, initialState, properties: [settable] },
  //     { key1, initialState1, properties: [settable] }
  //   ]);
  //
  //   const state = reducer(undefined, {
  //     type: `${slice}/${settable.type}`,
  //     key,
  //     value: 'coolValue'
  //   });
  //   state
  //     .keySeq()
  //     .toArray()[5]
  //     .should.equal('key');
  //   state.get('key').should.equal('coolValue');
  //   state.get(key1).should.equal(initialState1);
  // });
});
