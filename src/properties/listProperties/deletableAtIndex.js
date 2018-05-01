import Property from '../property';
import produce from 'immer';

const reducer = (state, action) => {
  if (Array.isArray(state[action.key])) {
    produce(state, draftState => {
      draftState[action.key].splice(action.index, 0);
    });
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
