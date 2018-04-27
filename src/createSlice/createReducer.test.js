import chai from 'chai';
import createReducer from './createReducer';
import settable from '../properties/settable';
import { fromJS } from 'immutable';

chai.should();

describe('createReducer()', () => {
  const slice = 'slice';
  const key = 'exampleKey',
    initialState = 'initial',
    key1 = 'exampleKey1',
    initialState1 = 'initial1';

  it('reducer returns expected initialState', () => {
    const reducer = createReducer(slice, [
      { key, initialState, properties: [settable] },
      { key: key1, initialState: initialState1, properties: [settable] }
    ]);
    const returnedInitialState = reducer(undefined, { type: 'NO_MATCHES' });
    returnedInitialState.get(key).should.equal(initialState);
    returnedInitialState.get(key1).should.equal(initialState1);
  });

  it('reducer works as expected with multiple stateObjects', () => {
    const reducer = createReducer(slice, [
      { key, initialState, properties: [settable] },
      { key: key1, initialState: initialState1, properties: [settable] }
    ]);

    const state = reducer(undefined, {
      type: `${slice}/${settable.type}`,
      key,
      value: 'coolValue'
    });
    state.get(key).should.equal('coolValue');
    state.get(key1).should.equal(initialState1);
  });
});
