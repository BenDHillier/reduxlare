import Property from '../property';
import { List } from 'immutable';

const reducer = (state, action) => {
  if (List.isList(state.get(action.key))) {
    state.set(action.key, state.get(action.key).pop());
  } else {
    console.error(
      `the field ${action.key} is not a list. Unable to perform action ${
        action.type
      }`
    );
  }
};
const actionCreator = () => ({});
const prefix = 'pop';

const poppable = new Property('POP', reducer, actionCreator, prefix);

export default poppable;
