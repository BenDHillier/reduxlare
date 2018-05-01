import Property from './property';
import produce from 'immer';

const reducer = (state, action) =>
  produce(state, draftState => {
    draftState[action.key] = !state[action.key];
  });
const actionCreator = () => ({});
const prefix = 'toggle';

const toggleable = new Property('TOGGLE', reducer, actionCreator, prefix);

export default toggleable;
