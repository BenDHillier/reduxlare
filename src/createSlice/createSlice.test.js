import chai from 'chai';
import createSlice from './createSlice';
import settable from '../properties/settable';
import { fromJS } from 'immutable';
import toggleable from '../properties/toggleable';

chai.should();

describe('createSlice()', () => {
  const sliceName = 'sliceName';
  const key = 'exampleKey',
    initialState = 'initial',
    key1 = 'exampleKey1',
    initialState1 = false;
  const { reducer, selectors, dispatchers } = createSlice(sliceName, [
    { key: 'exampleKey', initialState, properties: [settable] },
    {
      key: 'exampleKey1',
      initialState: initialState1,
      properties: [toggleable]
    }
  ]);

  it('createSlice() gives correct initial state', () => {
    const state = reducer(undefined, { type: null });
    state.get(key).should.equal(initialState);
    state.get(key1).should.equal(initialState1);
  });

  it('createSlice() selectors grab correct state', () => {
    const state = { [sliceName]: fromJS(reducer(undefined, { type: null })) };
    const props = { ...selectors[key](state), ...selectors[key1](state) };

    props[key].should.equal(initialState);
    props[key1].should.equal(initialState1);
  });

  it('createSlice() dispatchers update state properly', () => {
    const value = 'hey';
    const dispatchForKey = action => {
      const state = reducer(undefined, action);
      state.get(key).should.equal(value);
    };
    const dispatchForKey1 = action => {
      const state = reducer(undefined, action);
      state.get(key1).should.equal(true);
    };
    const props = {
      ...dispatchers.setExampleKey(dispatchForKey),
      ...dispatchers.toggleExampleKey1(dispatchForKey1)
    };

    props.setExampleKey(value);
    props.toggleExampleKey1();
  });
});
