import settable from './settable';

describe('settable', () => {
  const slice = 'slice',
    key = 'key';
  const reducer = settable.createReducer(slice);
  const actionCreator = settable.createActionCreator(slice, key);

  it('calling actionCreator should return the proper action', () => {
    const value = 'hey';
    const action = actionCreator(value);
    action.should.include({ type: `${slice}/${settable.type}`, value, key });
  });

  it('createDispatcherName() works as expected', () => {
    const dispatcherName = settable.createDispatcherName('field');
    dispatcherName.should.equal('setField');
  });

  it('calling reducer with actionCreator should return the proper state', () => {
    const firstValue = 'hey',
      secondValue = 'hey2';

    const firstState = reducer({}, actionCreator(firstValue));
    firstState[key].should.equal(firstValue);
    const secondState = reducer(firstState, actionCreator(secondValue));
    secondState[key].should.equal(secondValue);
  });
});
