import Property from '../property';
import pushable from './pushable';

describe('pushable', () => {
  const type = 'EXAMPLE',
    key = 'exampleKey';
  const slice = 'slice';

  it('calling pushable reducer with actionCreator should return the proper state', () => {
    const actionCreator = pushable.createActionCreator(slice, key);
    const reducer = pushable.createReducer(slice);
    const state = reducer({ [key]: ['hey'] }, actionCreator('sup'));
    state[key].length.should.equal(2);
    state[key][1].should.equal('sup');
  });
});
