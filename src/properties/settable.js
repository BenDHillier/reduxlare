import Property from './property';
import produce from 'immer';

const reducer = (state, action) =>
  produce(state, draftState => {
    draftState[action.key] = action.value;
  });
const actionCreator = value => ({ value });
const prefix = 'set';

const settable = new Property('SET', reducer, actionCreator, prefix);

export default settable;
