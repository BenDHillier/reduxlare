import settable from './settable';
import chai from 'chai';
import { fromJS } from 'immutable';

chai.should();

describe('settable', () => {
  const slice = 'slice';
  const reducer = settable.createReducer(slice);
  const actionCreator = settable.createActionCreator(slice);

  it('calling actionCreator should return the proper action', () => {
    const key = 'key',
      value = 'hey';
    const action = actionCreator(key, value);
    action.should.include({ type: `${slice}/${settable.type}`, value, key });
  });

  it('calling reducer with actionCreator should return the proper state', () => {
    const key = 'key',
      firstValue = 'hey',
      secondValue = 'hey2';

    const firstState = reducer(fromJS({}), actionCreator(key, firstValue));
    firstState.get(key).should.equal(firstValue);
    const secondState = reducer(firstState, actionCreator(key, secondValue));
    secondState.get(key).should.equal(secondValue);
  });
});
