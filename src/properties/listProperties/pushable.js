import Property from '../property';
import produce from 'immer';

const reducer = (state, action) => {
  if (Array.isArray(state[action.key])) {
    return produce(state, draftState =>
      draftState[action.key].push(action.value)
    );
  } else {
    console.error(
      `the field ${action.key} is not a list. Unable to perform action ${
        action.type
      }`
    );
  }
};
const actionCreator = value => ({ value });
const prefix = 'push';

const pushable = new Property('PUSH', reducer, actionCreator, prefix);

export default pushable;
