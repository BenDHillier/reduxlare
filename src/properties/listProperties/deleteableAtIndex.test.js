import Property from '../property';
import deleteableAtIndex from './deleteableAtIndex';

describe('deleteableAtIndex', () => {
  const type = 'EXAMPLE',
    key = 'exampleKey';
  const slice = 'slice';

  it('calling deleteableAtIndex reducer with actionCreator should return the proper state', () => {
    const actionCreator = deleteableAtIndex.createActionCreator(slice, key);
    const reducer = deleteableAtIndex.createReducer(slice);
    const state = reducer({ [key]: ['hey', 'a', 'b', 'd'] }, actionCreator(2));
    state[key].length.should.equal(3);
    state[key][2].should.equal('d');
    state[key][1].should.equal('a');
  });

  it('calling deleteableAtIndex reducer with actionCreator on empty array should throw error', () => {
    const actionCreator = deleteableAtIndex.createActionCreator(slice, key);
    const reducer = deleteableAtIndex.createReducer(slice);
    (() => reducer({ [key]: [] }, actionCreator(2))).should.throw();
  });

  it('calling deleteableAtIndex reducer with actionCreator on last element should work', () => {
    const actionCreator = deleteableAtIndex.createActionCreator(slice, key);
    const reducer = deleteableAtIndex.createReducer(slice);
    const state = reducer({ [key]: ['a', 'b', 'c'] }, actionCreator(2));
    state[key][1].should.equal('b');
    state[key][0].should.equal('a');
    state[key].length.should.equal(2);
  });
});
