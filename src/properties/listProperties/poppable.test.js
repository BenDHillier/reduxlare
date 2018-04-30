import Property from '../property';
import popable from './popable';
import chai from 'chai';
import { fromJS } from 'immutable';

chai.should();

describe('listProperties', () => {
  const type = 'EXAMPLE',
    key = 'exampleKey';
  const slice = 'slice';

  it('calling popables reducer with actionCreator should return the proper state', () => {
    // throw new Error(Object.keys(listProperties));
    const actionCreator = popable.createActionCreator(slice, key);
    const reducer = popable.createReducer(slice);
    const state = reducer(fromJS({ [key]: ['hey'] }), actionCreator());
    state.get(key).size.should.equal(0);
  });
});
