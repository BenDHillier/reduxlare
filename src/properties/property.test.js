import Property from './property';

describe('new Property()', () => {
  const type = 'EXAMPLE',
    key = 'exampleKey';
  const slice = 'slice';
  const exampleProperty = new Property(
    type,
    (state, action) => ({ ...state, value: action.value }),
    value => ({ value })
  );
  const reducer = exampleProperty.createReducer(slice);
  const actionCreator = exampleProperty.createActionCreator(slice, key);

  it('calling actionCreator should return the proper action', () => {
    const action = actionCreator('hey');
    action.type.should.equal(`${slice}/${type}`);
    action.key.should.equal(key);
    action.value.should.equal('hey');
  });

  it('calling reducer should return the proper state', () => {
    const state = reducer({}, { type: `${slice}/${type}`, value: 'hey' });
    state.value.should.equal('hey');
  });

  it('calling reducer with actionCreator should return the proper state', () => {
    const state = reducer({}, actionCreator('hey'));
    state.value.should.equal('hey');
  });
});
