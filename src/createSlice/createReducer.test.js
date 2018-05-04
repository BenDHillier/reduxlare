import createReducer from './createReducer';
import settable from '../properties/settable';

describe('createReducer()', () => {
  const slice = 'slice';
  const key = 'exampleKey',
    initialState = 'initial',
    key1 = 'exampleKey1',
    initialState1 = 'initial1';

  it('reducer returns expected initialState', () => {
    const reducer = createReducer(slice, [
      { key, initialState, properties: [settable] },
      { key: key1, initialState: initialState1, properties: [settable] },
    ]);
    const returnedInitialState = reducer(undefined, { type: 'NO_MATCHES' });
    returnedInitialState[key].should.equal(initialState);
    returnedInitialState[key1].should.equal(initialState1);
  });

  it('reducer returns expected initialState with nested fields', () => {
    const reducer = createReducer(slice, [
      { key, fields: [{ key, initialState, properties: [settable] }] },
    ]);
    const returnedInitialState = reducer(undefined, { type: 'NO_MATCHES' });
    returnedInitialState[key].should.include({ [key]: initialState });
  });

  it('reducer works as expected with multiple stateObjects', () => {
    const reducer = createReducer(slice, [
      { key, initialState, properties: [settable] },
      { key: key1, initialState: initialState1, properties: [settable] },
    ]);

    const state = reducer(undefined, {
      type: `${slice}/${settable.type}`,
      key,
      value: 'coolValue',
    });
    state[key].should.equal('coolValue');
    state[key1].should.equal(initialState1);
  });

  it('InitialState of field is undefined if omitted', () => {
    const reducer = createReducer(slice, [{ key, properties: [settable] }]);

    const state = reducer(undefined, {
      type: 'NONE',
    });
    expect(state[key]).to.be.undefined;
  });
});
