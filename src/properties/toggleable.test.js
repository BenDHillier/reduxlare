import toggleable from './toggleable';
import chai from 'chai';
import { fromJS } from 'immutable';

chai.should();

describe('toggleable', () => {
  const slice = 'slice',
    key = 'key';
  const reducer = toggleable.createReducer(slice);
  const actionCreator = toggleable.createActionCreator(slice, key);

  it('calling actionCreator should return the proper action', () => {
    const action = actionCreator();
    action.should.include({ type: `${slice}/${toggleable.type}`, key });
  });

  it('createDispatcherName() works as expected', () => {
    const dispatcherName = toggleable.createDispatcherName('field');
    dispatcherName.should.equal('toggleField');
  });

  it('calling reducer with actionCreator should return the proper state', () => {
    const firstState = reducer(fromJS({}), actionCreator());
    firstState.get(key).should.equal(true);
    const secondState = reducer(firstState, actionCreator());
    secondState.get(key).should.equal(false);
  });
});
