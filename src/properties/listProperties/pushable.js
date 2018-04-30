import Property from '../property';
import { List } from 'immutable';

const reducer = (state, action) => {
  if (List.isList(state.get(action.key))) {
    state.set(action.key, state.get(action.key).push(action.value));
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
