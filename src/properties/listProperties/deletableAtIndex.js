import Property from '../property';
import { List } from 'immutable';

const reducer = (state, action) => {
  if (List.isList(state.get(action.key))) {
    state.set(
      action.key,
      state.get(action.key).delete(action.index, action.value)
    );
  } else {
    console.error(
      `the field ${action.key} is not a list. Unable to perform action ${
        action.type
      }`
    );
  }
};
const actionCreator = (value, index) => ({ value, index });
const prefix = 'deleteAt';

const deleteableAtIndex = new Property(
  'DELETE_AT_INDEX',
  reducer,
  actionCreator,
  prefix
);

export default deleteableAtIndex;
