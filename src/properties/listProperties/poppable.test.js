import Property from '../property';
import poppable from './poppable';

describe('listProperties', () => {
  const type = 'EXAMPLE',
    key = 'exampleKey';
  const slice = 'slice';

  it('calling poppables reducer with actionCreator should return the proper state', () => {
    const actionCreator = poppable.createActionCreator(slice, key);
    const reducer = poppable.createReducer(slice);
    const state = reducer({ [key]: ['hey'] }, actionCreator());
    state[key].length.should.equal(0);
  });
});
