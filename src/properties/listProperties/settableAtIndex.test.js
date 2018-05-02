import Property from '../property';
import settableAtIndex from './settableAtIndex';

describe('settableAtIndex', () => {
  const type = 'EXAMPLE',
    key = 'exampleKey';
  const slice = 'slice';

  it('calling settableAtIndex reducer with actionCreator should return the proper state', () => {
    const actionCreator = settableAtIndex.createActionCreator(slice, key);
    const reducer = settableAtIndex.createReducer(slice);
    const state = reducer(
      { [key]: ['hey', 'a', 'b', 'd'] },
      actionCreator('sup', 2)
    );
    state[key].length.should.equal(4);
    state[key][2].should.equal('sup');
  });

  it('calling settableAtIndex reducer with actionCreator on empty array should throw error', () => {
    const actionCreator = settableAtIndex.createActionCreator(slice, key);
    const reducer = settableAtIndex.createReducer(slice);
    (() => reducer({ [key]: [] }, actionCreator('sup', 2))).should.throw();
  });

  it('calling settableAtIndex reducer with actionCreator on last element should work', () => {
    const actionCreator = settableAtIndex.createActionCreator(slice, key);
    const reducer = settableAtIndex.createReducer(slice);
    const state = reducer({ [key]: ['a', 'b', 'c'] }, actionCreator('sup', 2));
    state[key][2].should.equal('sup');
    state[key].length.should.equal(3);
  });
});
