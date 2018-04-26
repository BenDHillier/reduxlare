import Property from './property';
import chai from 'chai';

chai.should();

describe('new Property()', () => {
  const type = 'EXAMPLE';
  const slice = 'slice';
  const exampleProperty = new Property(
    type,
    (state, action) => ({ ...state, value: action.value }),
    value => ({ value })
  );
  const reducer = exampleProperty.createReducer(slice);
  const actionCreator = exampleProperty.createActionCreator(slice);

  it('calling actionCreator should return the proper action', () => {
    const action = actionCreator('hey');
    action.type.should.equal(`${slice}/${type}`);
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
