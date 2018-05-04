import createSlice from './createSlice';
import { listProperties, toggleable, settable } from '../properties';

const sliceName = 'sliceName';
const key = 'exampleKey',
  initialState = 'initial',
  key1 = 'exampleKey1',
  initialState1 = false;

describe('createSlice()', () => {
  it('gives correct initial state', () => {
    const { reducer, selectors, dispatchers } = simpleCreateSlice();
    const state = reducer(undefined, { type: null });
    state[key].should.equal(initialState);
    state[key1].should.equal(initialState1);
  });

  it('selectors grab correct state', () => {
    const { reducer, selectors, dispatchers } = simpleCreateSlice();
    const state = { [sliceName]: reducer(undefined, { type: null }) };
    const props = {
      ...selectors[key].get(state),
      ...selectors[key1].get(state),
    };

    props[key].should.equal(initialState);
    props[key1].should.equal(initialState1);
  });

  it('dispatchers update state properly', () => {
    const { reducer, selectors, dispatchers } = simpleCreateSlice();
    const value = 'hey';
    const dispatchForKey = action => {
      const state = reducer(undefined, action);
      state[key].should.equal(value);
    };
    const dispatchForKey1 = action => {
      const state = reducer(undefined, action);
      state[key1].should.equal(true);
    };
    const props = {
      ...dispatchers[key].set(dispatchForKey),
      ...dispatchers[key1].toggle(dispatchForKey1),
    };

    props.setExampleKey(value);
    props.toggleExampleKey1();
  });

  it('should throw if both an initialState and list of fields are given', () => {
    (() =>
      createSlice(sliceName, [
        {
          key,
          initialState,
          fields: [{ key, initialState, properties: [settable] }],
        },
      ])).should.throw();
  });

  it('should throw if no properties are given', () => {
    (() => {
      createSlice(sliceName, [{ key, initialState }]);
    }).should.throw();
  });

  it('should not throw if no properties are supplied to a field with nested fields', () => {
    createSlice(sliceName, [
      {
        key,
        fields: [{ key, initialState, properties: [settable] }],
      },
    ]);
  });
});

function simpleCreateSlice() {
  return createSlice(sliceName, [
    { key, initialState, properties: [settable] },
    {
      key: key1,
      initialState: initialState1,
      properties: [toggleable],
    },
    {
      key: 'list',
      initialState: [],
      properties: [listProperties],
    },
  ]);
}
