import settable from './settable';
import chai from 'chai';
import { fromJS } from 'immutable';

chai.should();

describe('settable', () => {
  const slice = 'slice';
  const reducer = settable.createReducer(slice);
  const actionCreator = settable.createActionCreator(slice);

  it('calling actionCreator should return the proper action', () => {
    const field = 'field',
      value = 'hey';
    const action = actionCreator(field, value);
    action.should.include({ type: `${slice}/${settable.type}`, value, field });
  });

  it('calling reducer with actionCreator should return the proper state', () => {
    const field = 'field',
      firstValue = 'hey',
      secondValue = 'hey2';

    const firstState = reducer(fromJS({}), actionCreator(field, firstValue));
    firstState.get(field).should.equal(firstValue);
    const secondState = reducer(firstState, actionCreator(field, secondValue));
    secondState.get(field).should.equal(secondValue);
  });
});
